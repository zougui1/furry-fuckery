import { Constructor } from 'type-fest';

import { isErrorType } from './isErrorType';

describe('isErrorType', () => {
  class Exception extends Error {
    code: string;

    constructor(code: string, message: string) {
      super(message);
      this.code = code;
    }
  }

  describe('when the value is not an instance of Error', () => {
    it('should return false', () => {
      const constructor = Exception;
      const value = { code: 'horny', message: 'Zougui is naughty' };

      const result = isErrorType(constructor)(value);

      expect(result).toBe(false);
    });
  });

  describe('when the value is an instance of Error', () => {
    it('should return true when not specifying a code', () => {
      const constructor = Exception;
      const value = new Exception('horny', 'Zougui is naughty');

      const result = isErrorType(constructor)(value);

      expect(result).toBe(true);
    });

    it('should return true when specifying a code and it matches', () => {
      const constructor = Exception;
      const value = new Exception('horny', 'Zougui is naughty');
      const code = 'horny';

      const result = isErrorType(constructor)(value, code);

      expect(result).toBe(true);
    });

    it('should return false when specifying a code and it does not match', () => {
      const constructor = Exception;
      const value = new Exception('horny', 'Zougui is naughty');
      const code = 'innocent';

      const result = isErrorType(constructor)(value, code);

      expect(result).toBe(false);
    });
  });
});
