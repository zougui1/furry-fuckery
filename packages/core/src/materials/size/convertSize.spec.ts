import { convertSize } from './convertSize';
import { SizeUnit } from './SizeUnit';

describe('convertSize', () => {
  describe('from centimeter', () => {
    const from = SizeUnit.Centimeter;

    it('should convert to centimeter', () => {
      const length = 1;
      const to = SizeUnit.Centimeter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length);
    });

    it('should convert to inch', () => {
      const length = 1;
      const to = SizeUnit.Inch;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length / 2.54);
    });

    it('should convert to foot', () => {
      const length = 1;
      const to = SizeUnit.Foot;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length / 30.48);
    });

    it('should convert to meter', () => {
      const length = 1;
      const to = SizeUnit.Meter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length / 100);
    });
  });

  describe('from inch', () => {
    const from = SizeUnit.Inch;

    it('should convert to centimeter', () => {
      const length = 1;
      const to = SizeUnit.Centimeter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length * 2.54);
    });

    it('should convert to inch', () => {
      const length = 1;
      const to = SizeUnit.Inch;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length);
    });

    it('should convert to foot', () => {
      const length = 1;
      const to = SizeUnit.Foot;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length / 12);
    });

    it('should convert to meter', () => {
      const length = 1;
      const to = SizeUnit.Meter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length / 39.37);
    });
  });

  describe('from foot', () => {
    const from = SizeUnit.Foot;

    it('should convert to centimeter', () => {
      const length = 1;
      const to = SizeUnit.Centimeter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length * 30.48);
    });

    it('should convert to inch', () => {
      const length = 1;
      const to = SizeUnit.Inch;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length * 12);
    });

    it('should convert to foot', () => {
      const length = 1;
      const to = SizeUnit.Foot;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length);
    });

    it('should convert to meter', () => {
      const length = 1;
      const to = SizeUnit.Meter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length / 3.281);
    });
  });

  describe('from meter', () => {
    const from = SizeUnit.Meter;

    it('should convert to centimeter', () => {
      const length = 1;
      const to = SizeUnit.Centimeter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length * 100);
    });

    it('should convert to inch', () => {
      const length = 1;
      const to = SizeUnit.Inch;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length * 39.37);
    });

    it('should convert to foot', () => {
      const length = 1;
      const to = SizeUnit.Foot;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length * 3.281);
    });

    it('should convert to meter', () => {
      const length = 1;
      const to = SizeUnit.Meter;

      const result = convertSize(length, { from, to });

      expect(result).toBe(length);
    });
  });
});
