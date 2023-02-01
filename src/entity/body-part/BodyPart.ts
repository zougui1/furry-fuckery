import { constructionDataSchema } from './schemas';
import { BodyPartQuery } from './query';
import { BodyPartType } from './BodyPartType';
import {
  Shape,
  ShapeData,
  Size,
  Wearable,
  WearableData,
  Liquid,
  LiquidData,
} from '../../materials';

export class BodyPart {
  static readonly Type = BodyPartType;
  static readonly schemas = {
    constructionData: constructionDataSchema,
  } as const;

  readonly shape: Shape;
  readonly parts: BodyPart[];
  type: BodyPartType;
  tag: string | undefined;
  colors: string[];
  wearables: Wearable[];
  stains: Liquid[];

  constructor(data: BodyPartData) {
    this.shape = new Shape(data);
    this.parts = data.parts?.map(part => new BodyPart(part)) || [];
    this.wearables = data.wearables?.map(Wearable.create) || [];
    this.stains = data.stains?.map(stain => new Liquid(stain)) || [];
    this.type = data.type;
    this.colors = data.colors;
    this.tag = data.tag;
  }

  //#region query
  query(): BodyPartQuery {
    return new BodyPartQuery(this);
  }

  tryQuery<T>(buildQuery: (query: BodyPartQuery) => T): TryQueryResult<T> {
    const query = this.query();

    try {
      const result = buildQuery(query);
      return [null, result];
    } catch (error) {
      if (BodyPartQuery.Error.is(error)) {
        return [error, null];
      }

      const queryError = query.createError({
        message: 'Body part not found',
        code: BodyPartQuery.Error.Code.Unknown,
        cause: error,
      });

      return [queryError, null];
    }
  }

  findPart(predicate: (bodyPart: BodyPart) => unknown): BodyPart | undefined {
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

  getAllParts(): BodyPart[] {
    return [
      ...this.parts,
      ...this.parts.flatMap(part => part.getAllParts()),
    ];
  }

  //#region shape accessors
  get width(): Size {
    return this.shape.width;
  }

  get length(): Size {
    return this.shape.length;
  }
  //#endregion
}

export interface BodyPartData extends ShapeData {
  type: BodyPartType;
  colors: string[];
  parts?: BodyPartData[] | undefined;
  tag?: string | undefined;
  wearables?: WearableData[] | undefined;
  stains?: LiquidData[] | undefined;
}

export type TryQueryResult<T> = (
  // error
  | [error: InstanceType<typeof BodyPartQuery.Error>, result: null]
  // success
  | [error: null, result: T]
)
