import { average } from './average';

describe('average', () => {
  describe('numbers', () => {
    it('should return the average of all the numbers', () => {
      const numbers = [1, 2, 3];

      const result = average(numbers);

      expect(result).toBe(2);
    });
  });

  describe('objects', () => {
    it('should return the average of all the numbers returned by the callback', () => {
      const items = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
      ];

      const result = average(items, item => item.num);

      expect(result).toBe(2);
    });
  });
});
