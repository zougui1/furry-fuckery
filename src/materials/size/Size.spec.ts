import { Size } from './Size';
import { SizeString } from './SizeString';

describe('Size', () => {
  describe('constructor', () => {
    it('should construct a size with the given parameters', () => {
      const value = 45;
      const unit = Size.Unit.Inch;

      const size = new Size(value, unit);

      expect(size.value).toBe(value);
      expect(size.unit).toBe(unit);
    });

    it('should construct a size in centimeters when no unit is provided', () => {
      const value = 45;

      const size = new Size(value);

      expect(size.value).toBe(value);
      expect(size.unit).toBe(Size.Unit.Centimeter);
    });
  });

  describe('static fromString', () => {
    it('should return a size in centimeters', () => {
      const str: SizeString = '45 meters';

      const size = Size.fromString(str);

      expect(size.value).toBe(4500);
      expect(size.unit).toBe(Size.Unit.Centimeter);
    });
  });

  describe('getMeters', () => {
    it('should return the size in meter', () => {
      const value = 100;
      const unit = Size.Unit.Centimeter;

      const size = new Size(value, unit);

      expect(size.getMeters()).toBe(1);
    });
  });

  describe('getCentimeters', () => {
    it('should return the size in centimeter', () => {
      const value = 1;
      const unit = Size.Unit.Meter;

      const size = new Size(value, unit);

      expect(size.getCentimeters()).toBe(100);
    });
  });

  describe('getFeet', () => {
    it('should return the size in foot', () => {
      const value = 12;
      const unit = Size.Unit.Inch;

      const size = new Size(value, unit);

      expect(size.getFeet()).toBe(1);
    });
  });

  describe('getInches', () => {
    it('should return the size in inch', () => {
      const value = 1;
      const unit = Size.Unit.Foot;

      const size = new Size(value, unit);

      expect(size.getInches()).toBe(12);
    });
  });

  describe('toString', () => {
    it('should return a string representation of the size without decimals', () => {
      const value = 12;
      const unit = Size.Unit.Foot;

      const size = new Size(value, unit);

      expect(size.toString()).toBe('12 foot');
    });

    it('should return a string representation of the size with only 1 decimal digit', () => {
      const value = 12.1;
      const unit = Size.Unit.Foot;

      const size = new Size(value, unit);

      expect(size.toString()).toBe('12.1 foot');
    });

    it('should return a string representation of the size with the decimals capped to 2 digits', () => {
      const value = 12.6874;
      const unit = Size.Unit.Foot;

      const size = new Size(value, unit);

      expect(size.toString()).toBe('12.69 foot');
    });
  });
});
