import { Liquid, LiquidData } from './Liquid';

describe('Liquid', () => {
  describe('constructor', () => {
    it('should construct a liquid object', () => {
      const data: LiquidData = {
        name: 'cum',
        colors: ['white'],
      };

      const result = new Liquid(data);

      expect(result.name).toBe(data.name);
      expect(result.colors).toEqual(data.colors);
    });
  });
});
