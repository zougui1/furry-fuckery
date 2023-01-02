import { Constructor } from 'type-fest';

export const isErrorType = <T extends ErrorWithCodeConstructor>(classConstructor: T) => {
  return (value: unknown, code?: string | undefined): value is InstanceType<T> => {
    if (!(value instanceof classConstructor)) {
      return false;
    }

    if (!code) {
      return true;
    }

    return value.code === code;
  }
}

type ErrorWithCodeConstructor = Constructor<Error & { code: string }>;
