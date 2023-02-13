import { range } from 'radash';
import { PartialDeep } from 'type-fest';

import { BodyPartDataBuilder, BodyPartDataBuilderData } from './BodyPartDataBuilder';
import { BodyPartBuilderQuery } from '../query';
import { BodyPartType, BodyPartData } from '../../entity';
import { WearableData, LiquidData, SizeString } from '../../materials';
import { Percent } from '../../utils';

export class BodyPartBuilder {
  parts: BodyPartBuilder[] = [];
  #data: BodyPartDataBuilder;

  constructor(data: MonoBodyPartBuilderData | undefined = {}, parent?: BodyPartBuilder) {
    this.#data = new BodyPartDataBuilder(data, parent);
    this.addParts(data.parts || []);
  }

  //#region data
  get type(): BodyPartType | undefined {
    return this.#data.type;
  }

  get colors(): string[] {
    return this.#data.colors;
  }

  get tag(): string | undefined {
    return this.#data.tag;
  }

  get wearables(): WearableData[] {
    return this.#data.wearables;
  }

  get stains(): LiquidData[] {
    return this.#data.stains;
  }

  get width(): SizeString | Percent.StringType | undefined {
    return this.#data.width;
  }

  get length(): SizeString | Percent.StringType | undefined {
    return this.#data.length;
  }

  set type(value: BodyPartType | undefined) {
    this.#data.type = value;
  }

  set colors(value: string[]) {
    this.#data.colors = value;
  }

  set tag(value: string | undefined) {
    this.#data.tag = value;
  }

  set wearables(value: WearableData[]) {
    this.#data.wearables = value;
  }

  set stains(value: LiquidData[]) {
    this.#data.stains = value;
  }

  set width(value: SizeString | Percent.StringType | undefined) {
    this.#data.width = value;
  }

  set length(value: SizeString | Percent.StringType | undefined) {
    this.#data.length = value;
  }

  setType(type: BodyPartType): this {
    this.#data.setType(type);
    return this;
  }

  setTag(tag: string): this {
    this.#data.setTag(tag);
    return this;
  }

  setWidth(width: SizeString | Percent.StringType): this {
    this.#data.setWidth(width);
    return this;
  }

  setLength(length: SizeString | Percent.StringType): this {
    this.#data.setLength(length);
    return this;
  }

  addColor(color: string): this {
    this.#data.addColor(color);
    return this;
  }

  addColors(colors: string[]): this {
    this.#data.addColors(colors);
    return this;
  }

  addWearable(wearable: WearableData): this {
    this.#data.addWearable(wearable);
    return this;
  }

  addWearables(wearables: WearableData[]): this {
    this.#data.addWearables(wearables);
    return this;
  }

  addStain(stain: LiquidData): this {
    this.#data.addStain(stain);
    return this;
  }

  addStains(stains: LiquidData[]): this {
    this.#data.addStains(stains);
    return this;
  }

  merge(data: MonoBodyPartBuilderData): this {
    this.#data.merge(data);

    if (data.parts) this.addParts(data.parts);

    return this;
  }

  getSize(size: SizeString | Percent.StringType, sizeType: 'width' | 'length'): SizeString {
    return this.#data.getSize(size, sizeType);
  }
  //#endregion

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
    return {
      ...this.#data.toObject(),
      parts: this.parts.map(part => part.toObject()),
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

export interface MonoBodyPartBuilderData extends BodyPartDataBuilderData {
  parts?: BodyPartBuilderData[] | undefined;
}

export interface MultiBodyPartBuilderData extends Omit<BodyPartDataBuilderData, 'tag'> {
  parts?: BodyPartBuilderData[] | undefined;
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
