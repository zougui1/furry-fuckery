import { getIsInRange } from './getIsInRange';

describe('getIsInRange', () => {
  it('should return false when the value is less than the min', () => {
    const value = 4;
    const min = 5;
    const max = 10;

    const result = getIsInRange(value, min, max);

    expect(result).toBe(false);
  });

  it('should return false when the value is greater than the max', () => {
    const value = 11;
    const min = 5;
    const max = 10;

    const result = getIsInRange(value, min, max);

    expect(result).toBe(false);
  });

  it('should return true when the value is equal to the min', () => {
    const value = 5;
    const min = 5;
    const max = 10;

    const result = getIsInRange(value, min, max);

    expect(result).toBe(true);
  });

  it('should return true when the value is equal to the max', () => {
    const value = 10;
    const min = 5;
    const max = 10;

    const result = getIsInRange(value, min, max);

    expect(result).toBe(true);
  });

  it('should return true when the value is between the min and max', () => {
    const value = 7;
    const min = 5;
    const max = 10;

    const result = getIsInRange(value, min, max);

    expect(result).toBe(true);
  });
});
