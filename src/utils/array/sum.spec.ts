import { sum } from './sum';

describe('sum', () => {
  describe('numbers', () => {
    it('should return the sum of all the numbers', () => {
      const numbers = [1, 2, 3];

      const result = sum(numbers);

      expect(result).toBe(6);
    });
  });

  describe('objects', () => {
    it('should return the sum of all the numbers returned by the callback', () => {
      const items = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
      ];

      const result = sum(items, item => item.num);

      expect(result).toBe(6);
    });
  });
});
