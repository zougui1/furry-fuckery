import { BodyPartQueryError, BodyPartQueryErrorData } from './BodyPartQueryError';
import { BodyPartQueryErrorCode } from './BodyPartQueryErrorCode';
import { BodyPartType } from '../BodyPartType';

describe('BodyPartQueryError', () => {
  describe('constructor', () => {
    it('should construct the error object', () => {
      const data: BodyPartQueryErrorData = {
        message: 'Dick not found',
        code: BodyPartQueryErrorCode.NotFound,
        type: BodyPartType.Penis,
        tag: 'left',
      };

      const error = new BodyPartQueryError(data);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(data.message);
      expect(error.name).toBe(BodyPartQueryError.name);
      expect(error.code).toBe(data.code);
      expect(error.type).toBe(data.type);
      expect(error.code).toBe(data.code);

      // @ts-ignore for some reason Error has no property cause in test files
      const { cause } = error;
      expect(cause).toBeUndefined();
    });

    it('should construct the error object with a cause', () => {
      const data: BodyPartQueryErrorData = {
        message: 'Dick not found',
        code: BodyPartQueryErrorCode.Unknown,
        type: BodyPartType.Penis,
        tag: 'left',
        cause: new Error('something bad happened'),
      };

      const error = new BodyPartQueryError(data);

      // @ts-ignore for some reason Error has no property cause in test files
      const { cause } = error;
      expect(cause).toBeInstanceOf(Error);
      expect(cause).toHaveProperty('message', 'something bad happened');
    });
  });

  describe('static is', () => {
    it('should return false when the value is not an instance of BodyPartQueryError', () => {
      const value = { code: 'horny' };
      const result = BodyPartQueryError.is(value);
      expect(result).toBe(false);
    });

    describe('without required code', () => {
      it('should return true when the value is an instance of BodyPartQueryError', () => {
        const value = new BodyPartQueryError({
          message: 'Zougui is naughty',
          code: BodyPartQueryErrorCode.NotFound,
        });

        const result = BodyPartQueryError.is(value);
        expect(result).toBe(true);
      });
    });

    describe('with required code', () => {
      it('should return false when the value is an instance of BodyPartQueryError and the code does not match', () => {
        const value = new BodyPartQueryError({
          message: 'Zougui is naughty',
          code: BodyPartQueryErrorCode.NotFound,
        });
        const code = BodyPartQueryErrorCode.Unknown;

        const result = BodyPartQueryError.is(value, code);
        expect(result).toBe(false);
      });

      it('should return false when the value is an instance of BodyPartQueryError and the code matches', () => {
        const value = new BodyPartQueryError({
          message: 'Zougui is naughty',
          code: BodyPartQueryErrorCode.NotFound,
        });
        const code = BodyPartQueryErrorCode.NotFound;

        const result = BodyPartQueryError.is(value, code);
        expect(result).toBe(true);
      });
    });
  });
});
