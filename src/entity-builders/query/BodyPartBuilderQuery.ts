import { BodyPartBuilderQueryError, BodyPartBuilderQueryErrorData } from './BodyPartBuilderQueryError';
import type { BodyPartBuilder } from '../BodyPartBuilder';
import { BodyPartType } from '../../entity';
import { CriteriasBuilder, CriteriaType, StringCriteriaStrategy } from '../../utils/query';

export class BodyPartBuilderQuery {
  static readonly Error = BodyPartBuilderQueryError;

  bodyPartBuilder: BodyPartBuilder;
  #criterias = new CriteriasBuilder<BodyPartBuilder>()
    .add('type', CriteriaType.String, bodyPartBuilder => bodyPartBuilder.type)
    .add('tag', CriteriaType.String, bodyPartBuilder => bodyPartBuilder.tag);

  constructor(bodyPartBuilder: BodyPartBuilder) {
    this.bodyPartBuilder = bodyPartBuilder;
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
  getOne(): BodyPartBuilder | undefined {
    return this.bodyPartBuilder.findPart(bodyPartBuilder => this.#criterias.compare(bodyPartBuilder));
  }

  getMany(): BodyPartBuilder[] {
    return this.bodyPartBuilder.getAllParts().filter(bodyPartBuilder => this.#criterias.compare(bodyPartBuilder));
  }

  getOneOrFail(): BodyPartBuilder {
    const bodyPartBuilder = this.getOne();

    if (!bodyPartBuilder) {
      // undefined is here for type safety
      const type = this.#criterias.getCriteriaValue('type')?.at(0);

      throw this.createError({
        message: `${type || 'Body part'} not found`,
        code: BodyPartBuilderQueryError.Code.NotFound,
      });
    }

    return bodyPartBuilder;
  }

  one(): BodyPartBuilderQuery {
    return this.getOneOrFail().query();
  }
  //#endregion

  //#region utils
  createError(data: CreateErrorData): BodyPartBuilderQueryError {
    // undefined is here for type safety
    const type = this.#criterias.getCriteriaValue('type')?.at(0);
    const tag = this.#criterias.getCriteriaValue('tag')?.at(0);

    return new BodyPartBuilderQueryError({
      ...data,
      type,
      tag,
    });
  }
  //#endregion
}

type CreateErrorData = Pick<BodyPartBuilderQueryErrorData, 'message' | 'code' | 'cause'>;
