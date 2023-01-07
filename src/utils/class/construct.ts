import { Constructor } from 'type-fest';

export const construct = <T extends AnyObject, TData extends AnyObject>(Constructor: Construct<T, TData>, data: T | TData): T => {
  if (data instanceof Constructor) {
    return data;
  }

  return new Constructor(data as TData);
}

type Construct<T extends AnyObject, TData extends AnyObject> = Constructor<T, [TData]>;

type AnyObject = Record<string, any>;
