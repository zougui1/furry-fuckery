import { Wearable, WearableData } from './Wearable';
import { Liquid } from '../liquid';

describe('Wearable', () => {
  describe('constructor', () => {
    it('should construct a wearable object without stains', () => {
      const data: WearableData = {
        name: 'dildo',
        colors: ['red', 'orange', 'yellow'],
      };

      const result = new Wearable(data);

      expect(result.name).toBe(data.name);
      expect(result.colors).toEqual(data.colors);
      expect(result.stains).toEqual([]);
    });

    it('should construct a wearable object with stains', () => {
      const data: WearableData = {
        name: 'dildo',
        colors: ['red', 'orange', 'yellow'],
        stains: [
          {
            name: 'cum',
            colors: ['white'],
          }
        ]
      };

      const result = new Wearable(data);

      expect(result.name).toBe(data.name);
      expect(result.colors).toEqual(data.colors);
      expect(result.stains).toEqual([
        expect.objectContaining({
          name: 'cum',
          colors: ['white'],
        }),
      ]);
    });
  });

  describe('static create', () => {
    it('should construct a wearable object', () => {
      const data: WearableData = {
        name: 'dildo',
        colors: ['red', 'orange', 'yellow'],
      };

      const result = Wearable.create(data);

      expect(result.name).toBe(data.name);
      expect(result.colors).toEqual(data.colors);
      expect(result.stains).toEqual([]);
    });

    it('should return the wearable object as is', () => {
      const data: WearableData = {
        name: 'dildo',
        colors: ['red', 'orange', 'yellow'],
      };
      const wearable = new Wearable(data);

      const result = Wearable.create(wearable);

      expect(result).toBe(wearable)
      expect(result.name).toBe(data.name);
      expect(result.colors).toEqual(data.colors);
      expect(result.stains).toEqual([]);
    });
  });
});
