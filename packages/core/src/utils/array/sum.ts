export function sum(numbers: number[]): number;
export function sum<T>(items: T[], toNumber: (item: T) => number): number;
export function sum<T>(items: T[] | number[], toNumber?: (item: T) => number): number {
  return (items as T[]).reduce((sum, item) => {
    const number = toNumber?.(item) ?? Number(item);
    return sum + number;
  }, 0);
}
