import { BodyPartQueryError } from './BodyPartQueryError';
import { BodyPartType } from '../BodyPartType';
import type { BodyPart } from '../BodyPart';

export class BodyPartQuery {
  static readonly Error: typeof BodyPartQueryError = BodyPartQueryError;

  bodyPart: BodyPart;
  #type: BodyPartType | undefined;
  #tag: string | undefined;

  constructor(bodyPart: BodyPart) {
    this.bodyPart = bodyPart;
  }

  //#region query building
  type(type: BodyPartType): this {
    this.#type = type;
    return this;
  }

  tag(tag: string): this {
    this.#tag = tag;
    return this;
  }
  //#endregion

  //#region get result
  getOne(): BodyPart | undefined {
    return this.bodyPart.findPart(bodyPart => this._compareBodyPart(bodyPart));
  }

  getMany(): BodyPart[] {
    return this.bodyPart.allParts().filter(bodyPart => this._compareBodyPart(bodyPart));
  }

  getOneOrFail(): BodyPart {
    const bodyPart = this.getOne();

    if (!bodyPart) {
      throw new BodyPartQueryError({
        message: `${this.#type || 'Body part'} not found`,
        code: BodyPartQueryError.Code.NotFound,
        type: this.#type,
        tag: this.#tag,
      });
    }

    return bodyPart;
  }

  one(): BodyPartQuery {
    return this.getOneOrFail().query();
  }
  //#endregion

  //#region comparison
  private _compareBodyPart(bodyPart: BodyPart): boolean {
    const criterias: QueryCriteria<unknown>[] = [
      {
        search: this.#type,
        value: bodyPart.type,
      },
      {
        search: this.#tag,
        value: bodyPart.tag,
      },
    ];

    return criterias
      // not all criterias may be set, in this case we exclude them from the query
      .filter(criteria => criteria.search !== undefined)
      .every(criteria => criteria.search === criteria.value);
  }
  //#endregion
}

type QueryCriteria<T> = {
  search: T;
  value: T;
}
