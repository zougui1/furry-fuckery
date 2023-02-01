import { ICriteria } from '../ICriteria';
import { getIsInRange } from '../../math';

export enum RangeCriteriaStrategy {
  /**
   * exclude `min` and `max` from the range
   */
  Bounded = 'bounded',
  /**
   * include `min` and `max` from the range
   */
  Unbounded = 'unbounded',
}

export class RangeCriteria implements ICriteria<number, Range> {
  static readonly Strategy = RangeCriteriaStrategy;

  #range: Range;
  #strategy: RangeCriteriaStrategy;

  constructor(range: Range, strategy: RangeCriteriaStrategy) {
    this.#range = range;
    this.#strategy = strategy;
  }

  compare(value: number): boolean {
    const compare = compareByStrategy[this.#strategy];
    return compare(value, this.#range);
  }

  getValue(): Range {
    return this.#range;
  }
}


export type Range = { min: number; max: number; }
type Comparator = (value: number, range: Range) => boolean;

const compareByStrategy: Record<RangeCriteriaStrategy, Comparator> = {
  bounded: (value, { min, max }) => getIsInRange(value, min + 1, max - 1),
  unbounded: (value, { min, max }) => getIsInRange(value, min, max),
};
