import { BodyPartQueryError, BodyPartQueryErrorData } from './BodyPartQueryError';
import { BodyPartType } from '../BodyPartType';
import type { BodyPart } from '../BodyPart';
import { CriteriasBuilder, CriteriaType, StringCriteriaStrategy } from '../../../utils/criteria';

export class BodyPartQuery {
  static readonly Error = BodyPartQueryError;

  bodyPart: BodyPart;
  #criterias = new CriteriasBuilder<BodyPart>()
    .add('type', CriteriaType.String, bodyPart => bodyPart.type)
    .add('tag', CriteriaType.String, bodyPart => bodyPart.tag);

  constructor(bodyPart: BodyPart) {
    this.bodyPart = bodyPart;
  }

  //#region query building
  type(type: BodyPartType): this {
    this.#criterias.set('type', [type], StringCriteriaStrategy.Includes);
    return this;
  }

  tag(tag: string): this {
    this.#criterias.set('tag', [tag], StringCriteriaStrategy.Includes);
    return this;
  }
  //#endregion

  //#region get result
  getOne(): BodyPart | undefined {
    return this.bodyPart.findPart(bodyPart => this.#criterias.compare(bodyPart));
  }

  getMany(): BodyPart[] {
    return this.bodyPart.getAllParts().filter(bodyPart => this.#criterias.compare(bodyPart));
  }

  getOneOrFail(): BodyPart {
    const bodyPart = this.getOne();

    if (!bodyPart) {
      // undefined is here for type safety
      const type = this.#criterias.getCriteriaValue('type')?.at(0);

      throw this.createError({
        message: `${type || 'Body part'} not found`,
        code: BodyPartQueryError.Code.NotFound,
      });
    }

    return bodyPart;
  }

  one(): BodyPartQuery {
    return this.getOneOrFail().query();
  }
  //#endregion

  //#region utils
  createError(data: CreateErrorData): BodyPartQueryError {
    // undefined is here for type safety
    const type = this.#criterias.getCriteriaValue('type')?.at(0);
    const tag = this.#criterias.getCriteriaValue('tag')?.at(0);

    return new BodyPartQueryError({
      ...data,
      type,
      tag,
    });
  }
  //#endregion
}

type CreateErrorData = Pick<BodyPartQueryErrorData, 'message' | 'code' | 'cause'>;
