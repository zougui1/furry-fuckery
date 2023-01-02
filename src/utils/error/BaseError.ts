import { isErrorType } from './isErrorType';

export class BaseError extends Error {
  code: string;

  constructor(data: BaseErrorData) {
    super(data.message, { cause: data.cause });

    this.code = data.code;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

  //#region static methods
  static is(value: unknown, code?: string | undefined): value is BaseError {
    return isErrorType(BaseError)(value, code);
  }
  //#endregion
}

export interface BaseErrorData {
  message: string;
  code: string;
  cause?: Error | undefined;
}
