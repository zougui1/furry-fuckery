//@ts-nocheck
import { BodyPartQueryError, BodyPartQueryErrorData } from './BodyPartQueryError';
import { CriteriasBuilder } from '../criteria';

export abstract class Query<T, TQuery extends Query<T> = Query<T, any>> {
  static readonly Error = BodyPartQueryError;
  protected abstract criterias: CriteriasBuilder<T>;
  #options: QueryOptions<T, TQuery>;

  // TODO Error (that must extend a generic QueryError) as parameter
  constructor(options: QueryOptions<T, TQuery>) {
    this.#options = options;
  }

  //#region get result
  getOne(): T | undefined {
    return this.#options.findOne(value => this.criterias.compare(value));
  }

  getMany(): T[] {
    return this.#options.getAll().filter(value => this.criterias.compare(value));
  }

  getOneOrFail(): T {
    const bodyPart = this.getOne();

    if (!bodyPart) {
      // undefined is here for type safety
      const type = this.criterias.getCriteriaValue('type')?.at(0);

      throw this.createError({
        message: `${type || 'Body part'} not found`,
        code: BodyPartQueryError.Code.NotFound,
      });
    }

    return bodyPart;
  }

  one(): TQuery {
    return this.#options.getQueryFromValue(this.getOneOrFail());
  }
  //#endregion

  //#region utils
  createError(data: CreateErrorData): BodyPartQueryError {
    // undefined is here for type safety
    const type = this.criterias.getCriteriaValue('type')?.at(0);
    const tag = this.criterias.getCriteriaValue('tag')?.at(0);

    return new BodyPartQueryError({
      ...data,
      type,
      tag,
    });
  }
  //#endregion
}

type CreateErrorData = Pick<BodyPartQueryErrorData, 'message' | 'code' | 'cause'>;

export interface QueryOptions<T, TQuery extends Query<T> = Query<T, any>> {
  findOne: (predicate: (value: T) => unknown) => T | undefined;
  getAll: () => T[];
  getQueryFromValue: (value: T) => TQuery;
}
