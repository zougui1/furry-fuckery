import { BaseError, BaseErrorData } from './BaseError';

describe('BaseError', () => {
  describe('constructor', () => {
    it('should construct a complete error instance', () => {
      const data: BaseErrorData = {
        message: 'Zougui is naughty',
        code: 'horny',
        cause: new Error('sexy dragons'),
      };

      const result = new BaseError(data);

      expect(result.name).toBe(BaseError.name);
      expect(result.code).toBe(data.code);
      expect(result.message).toBe(data.message);
      expect(result.cause).toBe(data.cause);
    });

    it('should take the name of the class it is inherited from', () => {
      class Exception extends BaseError { }

      const data: BaseErrorData = {
        message: 'Zougui is naughty',
        code: 'horny',
      };

      const result = new Exception(data);

      expect(result.name).toBe(Exception.name);
    });
  });

  describe('static is', () => {
    it('should return false when the value is not an instance of BaseError', () => {
      const value = { code: 'horny' };
      const result = BaseError.is(value);
      expect(result).toBe(false);
    });

    describe('without required code', () => {
      it('should return true when the value is an instance of BaseError', () => {
        const value = new BaseError({
          message: 'Zougui is naughty',
          code: 'horny',
          cause: new Error('sexy dragons'),
        });

        const result = BaseError.is(value);
        expect(result).toBe(true);
      });
    });

    describe('with required code', () => {
      it('should return false when the value is an instance of BaseError and the code does not match', () => {
        const value = new BaseError({
          message: 'Zougui is naughty',
          code: 'horny',
        });
        const code = 'innocent';

        const result = BaseError.is(value, code);
        expect(result).toBe(false);
      });

      it('should return false when the value is an instance of BaseError and the code matches', () => {
        const value = new BaseError({
          message: 'Zougui is naughty',
          code: 'horny',
        });
        const code = 'horny';

        const result = BaseError.is(value, code);
        expect(result).toBe(true);
      });
    });
  });
});
