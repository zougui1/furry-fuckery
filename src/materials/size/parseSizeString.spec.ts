import { parseSizeString } from './parseSizeString';
import { SizeUnit } from './SizeUnit';
import { SizeString } from './SizeString';

describe('parseSizeString', () => {
  it('should throw an error when the string contains more than 100 characters', () => {
    const str = '1'.repeat(101);
    const targetUnit = SizeUnit.Centimeter;

    const getResult = () => parseSizeString(str, targetUnit);

    expect(getResult).toThrowError('Value exceeds the maximum length of 100 characters.');
  });

  it('should throw an error when the string is not that of a size', () => {
    const str = '10 hours';
    const targetUnit = SizeUnit.Centimeter;

    const getResult = () => parseSizeString(str, targetUnit);

    expect(getResult).toThrowError('Invalid size string');
  });

  describe('size string in centimeters', () => {
    it('should parse the size in singular form', () => {
      const str: SizeString = '10 centimeter';
      const targetUnit = SizeUnit.Centimeter;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });

    it('should parse the size in plural form', () => {
      const str: SizeString = '10 centimeters';
      const targetUnit = SizeUnit.Centimeter;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });
  });

  describe('size string in inches', () => {
    it('should parse the size in singular form', () => {
      const str: SizeString = '10 inch';
      const targetUnit = SizeUnit.Inch;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });

    it('should parse the size in plural form', () => {
      const str: SizeString = '10 inches';
      const targetUnit = SizeUnit.Inch;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });
  });

  describe('size string in feet', () => {
    it('should parse the size in singular form', () => {
      const str: SizeString = '10 foot';
      const targetUnit = SizeUnit.Foot;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });

    it('should parse the size in plural form', () => {
      const str: SizeString = '10 feet';
      const targetUnit = SizeUnit.Foot;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });
  });

  describe('size string in meters', () => {
    it('should parse the size in singular form', () => {
      const str: SizeString = '10 meter';
      const targetUnit = SizeUnit.Meter;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });

    it('should parse the size in plural form', () => {
      const str: SizeString = '10 meters';
      const targetUnit = SizeUnit.Meter;

      const result = parseSizeString(str, targetUnit);

      expect(result).toBe(10);
    });
  });
});
