import { ICriteria } from '../ICriteria';

export enum ArrayCriteriaStrategy {
  Any = 'any',
  Every = 'every',
}

export class ArrayCriteria<T> implements ICriteria<T[]> {
  static readonly Strategy = ArrayCriteriaStrategy;

  #criterias: T[];
  #strategy: ArrayCriteriaStrategy;

  constructor(criterias: T[], strategy: ArrayCriteriaStrategy) {
    this.#criterias = criterias;
    this.#strategy = strategy;
  }

  compare(values: T[]): boolean {
    const compare = compareByStrategy[this.#strategy];
    return compare(values, this.#criterias);
  }

  getValue(): T[] {
    return this.#criterias;
  }
}

type Comparator = <T>(values: T[], criterias: T[]) => boolean;

const compareByStrategy: Record<ArrayCriteriaStrategy, Comparator> = {
  any: <T>(values: T[], criterias: T[]) => criterias.some(criteria => values.includes(criteria)),
  every: <T>(values: T[], criterias: T[]) => criterias.every(criteria => values.includes(criteria)),
};
