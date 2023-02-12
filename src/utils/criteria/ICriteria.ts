export interface ICriteria<T, TCriteria = T> {
  compare(value: T): boolean;
  getValue(): TCriteria;
}
