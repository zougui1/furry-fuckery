import { BodyPartQueryErrorCode } from './BodyPartQueryErrorCode';
import { BodyPartType } from '../BodyPartType';
import { BaseError, isErrorType } from '../../../utils';

export class BodyPartQueryError extends BaseError {
  static readonly Code = BodyPartQueryErrorCode;

  code: BodyPartQueryErrorCode;
  type: BodyPartType | undefined;
  tag: string | undefined;

  constructor(data: BodyPartQueryErrorData) {
    super(data);

    this.code = data.code;
    this.type = data.type;
    this.tag = data.tag;
  }

  //#region static methods
  static is(value: unknown, code?: BodyPartQueryErrorCode | undefined): value is BodyPartQueryError {
    return isErrorType(BodyPartQueryError)(value, code);
  }
  //#endregion
}

export interface BodyPartQueryErrorData {
  message: string;
  code: BodyPartQueryErrorCode;
  type?: BodyPartType | undefined;
  tag?: string | undefined;
  cause?: unknown;
}
