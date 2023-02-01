import { getType } from './getType';

describe('getType', () => {
  it('should return the string "string" when the value is a string', () => {
    const value = 'Zougui';
    const result = getType(value);
    expect(result).toBe('string');
  });

  it('should return the string "number" when the value is a number', () => {
    const value = 69;
    const result = getType(value);
    expect(result).toBe('number');
  });

  it('should return the string "bigint" when the value is a bigint', () => {
    const value = BigInt(69);
    const result = getType(value);
    expect(result).toBe('bigint');
  });

  it('should return the string "boolean" when the value is a boolean', () => {
    const value = true;
    const result = getType(value);
    expect(result).toBe('boolean');
  });

  it('should return the string "symbol" when the value is a symbol', () => {
    const value = Symbol('Zougui');
    const result = getType(value);
    expect(result).toBe('symbol');
  });

  it('should return the string "undefined" when the value is undefined', () => {
    const value = undefined;
    const result = getType(value);
    expect(result).toBe('undefined');
  });

  it('should return the string "object" when the value is an object', () => {
    const value = {};
    const result = getType(value);
    expect(result).toBe('object');
  });

  it('should return the string "function" when the value is a function', () => {
    const value = () => {};
    const result = getType(value);
    expect(result).toBe('function');
  });

  it('should return the string "array" when the value is an array', () => {
    const value: unknown[] = [];
    const result = getType(value);
    expect(result).toBe('array');
  });

  it('should return the string "null" when the value is null', () => {
    const value = null;
    const result = getType(value);
    expect(result).toBe('null');
  });
});
