import { range } from 'radash';
import { PartialDeep } from 'type-fest';

import { BodyPartBuilderQuery } from './query';
import { BodyPartType, BodyPartData } from '../entity';
import { WearableData, LiquidData, Size, SizeString } from '../materials';
import { Percent } from '../utils';

export class BodyPartBuilder {
  parts: BodyPartBuilder[] = [];
  readonly parent: BodyPartBuilder | undefined;
  type: BodyPartType | undefined;
  colors: string[];
  tag: string | undefined;
  wearables: WearableData[];
  stains: LiquidData[];
  width: SizeString | Percent.StringType | undefined;
  length: SizeString | Percent.StringType | undefined;

  constructor(data: MonoBodyPartBuilderData | undefined = {}, parent?: BodyPartBuilder) {
    this.type = data.type;
    this.colors = data.colors || [];
    this.tag = data.tag;
    this.wearables = data.wearables || [];
    this.stains = data.stains || [];
    this.width = data.width;
    this.length = data.length;
    this.parent = parent;

    this.addParts(data.parts || []);
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

  private getSize(size: SizeString | Percent.StringType, sizeType: 'width' | 'length'): SizeString {
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

  merge(data: MonoBodyPartBuilderData): this {
    if (data.length) this.length = data.length;
    if (data.width) this.width = data.width;
    if (data.colors) this.colors = data.colors;
    if (data.tag) this.tag = data.tag;

    if (data.stains) this.addStains(data.stains);
    if (data.parts) this.addParts(data.parts);
    if (data.wearables) this.addWearables(data.wearables);

    return this;
  }

  createPart(part: MonoBodyPartBuilderData): BodyPartBuilder;
  createPart(part: MultiBodyPartBuilderData): BodyPartBuilder[];
  createPart(part: BodyPartBuilderData): BodyPartBuilder | BodyPartBuilder[] {
    if (!('count' in part)) {
      const partBuilder = new BodyPartBuilder(part, this);
      this.parts.push(partBuilder);
      return partBuilder;
    }

    const { count, tags, ...countlessPart } = part;

    const parts = [...range(part.count - 1)].map((index) => {
      return this.createPart({
        ...countlessPart,
        tag: tags?.[index],
      });
    });

    return parts;
  }

  addPart(part: BodyPartBuilderData): this {
    this.createPart(part);
    return this;
  }

  addParts(parts: BodyPartBuilderData[]): this {
    for (const part of parts) {
      this.addPart(part);
    }

    return this;
  }

  toObject(): PartialBodyPartData {
    const colors = this.colors.length
      ? this.colors
      : this.parent?.colors;

    return {
      parts: this.parts.map(part => part.toObject()),
      colors: colors || [],
      tag: this.tag,
      type: this.type,
      wearables: this.wearables,
      stains: this.stains,
      width: this.width ? this.getSize(this.width, 'width') : undefined,
      length: this.length ? this.getSize(this.length, 'length') : undefined,
    };
  }

  //#region query
  query(): BodyPartBuilderQuery {
    return new BodyPartBuilderQuery(this);
  }

  tryQuery<T>(buildQuery: (query: BodyPartBuilderQuery) => T): TryQueryResult<T> {
    const query = this.query();

    try {
      const result = buildQuery(query);
      return [null, result];
    } catch (error) {
      if (BodyPartBuilderQuery.Error.is(error)) {
        return [error, null];
      }

      const queryError = query.createError({
        message: 'Body part not found',
        code: BodyPartBuilderQuery.Error.Code.Unknown,
        cause: error,
      });

      return [queryError, null];
    }
  }

  findPart(predicate: (bodyPart: BodyPartBuilder) => unknown): BodyPartBuilder | undefined {
    for (const part of this.parts) {
      if (predicate(part)) {
        return part;
      }

      const maybeSubPart = part.findPart(predicate);

      if (maybeSubPart) {
        return maybeSubPart;
      }
    }
  }
  //#endregion

  getAllParts(): BodyPartBuilder[] {
    return [
      ...this.parts,
      ...this.parts.flatMap(part => part.getAllParts()),
    ];
  }
}

export interface MonoBodyPartBuilderData {
  length?: SizeString | Percent.StringType | undefined;
  width?: SizeString | Percent.StringType | undefined;
  parts?: BodyPartBuilderData[] | undefined;
  type?: BodyPartType | undefined;
  colors?: string[] | undefined;
  tag?: string | undefined;
  wearables?: WearableData[] | undefined;
  stains?: LiquidData[] | undefined;
}

export interface MultiBodyPartBuilderData {
  length?: SizeString | Percent.StringType | undefined;
  width?: SizeString | Percent.StringType | undefined;
  parts?: BodyPartBuilderData[] | undefined;
  type?: BodyPartType | undefined;
  colors?: string[] | undefined;
  wearables?: WearableData[] | undefined;
  stains?: LiquidData[] | undefined;
  /**
   * create `count` times the same part
   */
  count: number;
  tags?: (string | undefined)[] | undefined;
}

export type BodyPartBuilderData = MonoBodyPartBuilderData | MultiBodyPartBuilderData;

export interface PartialBodyPartData extends PartialDeep<Omit<BodyPartData, 'parts'>> {
  parts?: PartialBodyPartData[] | undefined;
}

export type TryQueryResult<T> = (
  // error
  | [error: InstanceType<typeof BodyPartBuilderQuery.Error>, result: null]
  // success
  | [error: null, result: T]
)
