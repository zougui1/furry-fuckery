import { Shape, ShapeData } from './Shape';
import { Size } from '../size';

describe('Shape', () => {
  describe('constructor', () => {
    it('should construct a shape with a length and a width converted to centimeters', () => {
      const data: ShapeData = {
        length: '45 meters',
        width: '2 meters',
      };

      const shape = new Shape(data);

      expect(shape.length).toBeInstanceOf(Size);
      expect(shape.length.value).toBe(4500);
      expect(shape.length.unit).toBe(Size.Unit.Centimeter);

      expect(shape.width).toBeInstanceOf(Size);
      expect(shape.width.value).toBe(200);
      expect(shape.width.unit).toBe(Size.Unit.Centimeter);
    });
  });
});
