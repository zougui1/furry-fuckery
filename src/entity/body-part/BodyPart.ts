import { BodyPartType } from './BodyPartType';
import { BodyPartQuery } from './query';
import { Shape, ShapeData } from '../../materials/shape/Shape';

export class BodyPart extends Shape {
  static readonly Type: typeof BodyPartType = BodyPartType;

  readonly parts: BodyPart[];
  type: BodyPartType;
  tag: string | undefined;

  constructor(data: BodyPartData) {
    super(data);

    this.parts = data.parts?.map(part => new BodyPart(part)) || [];
    this.type = data.type;
    this.tag = data.tag;
  }

  //#region query
  query(): BodyPartQuery {
    return new BodyPartQuery(this);
  }

  tryQuery<T>(buildQuery: (query: BodyPartQuery) => T): TryQueryResult<T> {
    try {
      const result = buildQuery(this.query());
      return [null, result];
    } catch (error) {
      if (BodyPartQuery.Error.is(error)) {
        return [error, null];
      }

      const queryError = new BodyPartQuery.Error({
        message: 'Body part not found',
        code: BodyPartQuery.Error.Code.Unknown,
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

  allParts(): BodyPart[] {
    return [
      ...this.parts,
      ...this.parts.flatMap(part => part.allParts()),
    ];
  }
}

export interface BodyPartData extends ShapeData {
  type: BodyPartType;
  parts?: BodyPartData[] | undefined;
  tag?: string | undefined;
}

export type TryQueryResult<T> = (
  // error
  | [error: InstanceType<typeof BodyPartQuery.Error>, result: null]
  // success
  | [error: null, result: T]
)