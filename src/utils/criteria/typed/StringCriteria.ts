import { ICriteria } from '../ICriteria';

export enum StringCriteriaStrategy {
  Includes = 'includes',
}

export class StringCriteria<T extends string> implements ICriteria<T, T[]> {
  static readonly Strategy = StringCriteriaStrategy;

  #criterias: T[];
  #strategy: StringCriteriaStrategy;

  constructor(criterias: T[], strategy: StringCriteriaStrategy) {
    this.#criterias = criterias;
    this.#strategy = strategy;
  }

  compare(value: T): boolean {
    const compare = compareByStrategy[this.#strategy];
    return compare(value, this.#criterias);
  }

  getValue(): T[] {
    return this.#criterias;
  }
}

type Comparator = <T>(value: T, criterias: T[]) => boolean;

const compareByStrategy: Record<StringCriteriaStrategy, Comparator> = {
  includes: <T>(value: T, criterias: T[]) => criterias.includes(value),
};
