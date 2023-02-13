import { sum } from './sum';

/**
 * should never be called. exists just for type-safety purposes.
 * @param value
 * @returns
 */
const getNumber = (value: unknown): number => Number(value);

export function average(numbers: number[]): number;
export function average<T>(items: T[], toNumber: (item: T) => number): number;
export function average<T>(items: T[] | number[], toNumber?: (item: T) => number): number {
  const number = sum(items as T[], toNumber || getNumber);

  return number / items.length;
}
