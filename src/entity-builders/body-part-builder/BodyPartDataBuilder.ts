import { PartialDeep } from 'type-fest';

import type { BodyPartBuilder } from './BodyPartBuilder';
import { BodyPartType, BodyPartData } from '../../entity';
import { WearableData, LiquidData, Size, SizeString } from '../../materials';
import { Percent } from '../../utils';

export class BodyPartDataBuilder {
  type: BodyPartType | undefined;
  colors: string[];
  tag: string | undefined;
  wearables: WearableData[];
  stains: LiquidData[];
  width: SizeString | Percent.StringType | undefined;
  length: SizeString | Percent.StringType | undefined;
  readonly parent: BodyPartBuilder | undefined;

  constructor(data: BodyPartDataBuilderData | undefined = {}, parent?: BodyPartBuilder) {
    this.type = data.type;
    this.colors = data.colors || [];
    this.tag = data.tag;
    this.wearables = data.wearables || [];
    this.stains = data.stains || [];
    this.width = data.width;
    this.length = data.length;
    this.parent = parent;
  }

  setType(type: BodyPartType): this {
    this.type = type;
    return this;
  }

  setTag(tag: string): this {
    this.tag = tag;
    return this;
  }

  setWidth(width: SizeString | Percent.StringType): this {
    this.width = width;
    return this;
  }

  setLength(length: SizeString | Percent.StringType): this {
    this.length = length;
    return this;
  }

  addColor(color: string): this {
    this.colors.push(color);
    return this;
  }

  addColors(colors: string[]): this {
    this.colors.push(...colors);
    return this;
  }

  addWearable(wearable: WearableData): this {
    this.wearables.push(wearable);
    return this;
  }

  addWearables(wearables: WearableData[]): this {
    this.wearables.push(...wearables);
    return this;
  }

  addStain(stain: LiquidData): this {
    this.stains.push(stain);
    return this;
  }

  addStains(stains: LiquidData[]): this {
    this.stains.push(...stains);
    return this;
  }

  merge(data: BodyPartDataBuilderData): this {
    if (data.length) this.length = data.length;
    if (data.width) this.width = data.width;
    if (data.colors) this.colors = data.colors;
    if (data.tag) this.tag = data.tag;

    if (data.stains) this.addStains(data.stains);
    if (data.wearables) this.addWearables(data.wearables);

    return this;
  }

  getSize(size: SizeString | Percent.StringType, sizeType: 'width' | 'length'): SizeString {
    if (!Percent.isValidString(size)) {
      return size;
    }

    const maybeParentSize = this.parent?.[sizeType];

    if (!this.parent || !maybeParentSize) {
      throw this.getNoParentSizeError(sizeType);
    }

    const parentSize = Percent.isValidString(maybeParentSize)
      ? this.parent.getSize(maybeParentSize, sizeType)
      : maybeParentSize;

    return this.computeSize(size, parentSize);
  }

  private computeSize(size: Percent.StringType, parentSizeString: SizeString): SizeString {
    const parentSize = Size.fromString(parentSizeString);
    const relativeSize = Percent.apply(size, parentSize.value);
    return new Size(relativeSize, parentSize.unit).toString();
  }

  private getNoParentSizeError(label: string): Error {
    const invalidity = this.parent
      ? `that has a parent with no ${label}`
      : 'that has no parent';

    return new Error(`Cannot use a size relative on a body part ${invalidity}`);
  }

  toObject(): PartialDeep<Omit<BodyPartData, 'parts'>> {
    const colors = this.colors.length
      ? this.colors
      : this.parent?.colors;

    return {
      colors: colors || [],
      tag: this.tag,
      type: this.type,
      wearables: this.wearables,
      stains: this.stains,
      width: this.width ? this.getSize(this.width, 'width') : undefined,
      length: this.length ? this.getSize(this.length, 'length') : undefined,
    };
  }
}

export interface BodyPartDataBuilderData {
  length?: SizeString | Percent.StringType | undefined;
  width?: SizeString | Percent.StringType | undefined;
  type?: BodyPartType | undefined;
  colors?: string[] | undefined;
  tag?: string | undefined;
  wearables?: WearableData[] | undefined;
  stains?: LiquidData[] | undefined;
}
