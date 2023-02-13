import { BodyPartBuilderQueryErrorCode } from './BodyPartBuilderQueryErrorCode';
import { BodyPartType } from '../../entity';
import { BaseError, isErrorType } from '../../utils';

export class BodyPartBuilderQueryError extends BaseError {
  static readonly Code = BodyPartBuilderQueryErrorCode;

  code: BodyPartBuilderQueryErrorCode;
  type: BodyPartType | undefined;
  tag: string | undefined;

  constructor(data: BodyPartBuilderQueryErrorData) {
    super(data);

    this.code = data.code;
    this.type = data.type;
    this.tag = data.tag;
  }

  //#region static methods
  static is(value: unknown, code?: BodyPartBuilderQueryErrorCode | undefined): value is BodyPartBuilderQueryError {
    return isErrorType(BodyPartBuilderQueryError)(value, code);
  }
  //#endregion
}

export interface BodyPartBuilderQueryErrorData {
  message: string;
  code: BodyPartBuilderQueryErrorCode;
  type?: BodyPartType | undefined;
  tag?: string | undefined;
  cause?: unknown;
}
