import { RangeCriteria, Range } from './RangeCriteria';

describe('RangeCriteria', () => {
  describe('compare', () => {
    describe('Strategy.Bounded', () => {
      const strategy = RangeCriteria.Strategy.Bounded;

      it('should return false the value is less than the min', () => {
        const range = { min: 5, max: 10 };
        const value = 4;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return false the value is greater than the max', () => {
        const range = { min: 5, max: 10 };
        const value = 11;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return false the value is equal to the min', () => {
        const range = { min: 5, max: 10 };
        const value = 5;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return false the value is equal to the max', () => {
        const range = { min: 5, max: 10 };
        const value = 10;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return true the value is between the min and max', () => {
        const range = { min: 5, max: 10 };
        const value = 7;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(true);
      });
    });

    describe('Strategy.Unbounded', () => {
      const strategy = RangeCriteria.Strategy.Unbounded;

      it('should return false the value is less than the min', () => {
        const range = { min: 5, max: 10 };
        const value = 4;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return false the value is greater than the max', () => {
        const range = { min: 5, max: 10 };
        const value = 11;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return true the value is equal to the min', () => {
        const range = { min: 5, max: 10 };
        const value = 5;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(true);
      });

      it('should return true the value is equal to the max', () => {
        const range = { min: 5, max: 10 };
        const value = 10;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(true);
      });

      it('should return true the value is between the min and max', () => {
        const range = { min: 5, max: 10 };
        const value = 7;

        const criteria = new RangeCriteria(range, strategy);

        expect(criteria.compare(value)).toBe(true);
      });
    });
  });

  describe('getValue', () => {
    const strategy = RangeCriteria.Strategy.Bounded;

    it('should return the values given to the criteria', () => {
      const criterias: Range = { min: 0, max: 2 };
      const criteria = new RangeCriteria(criterias, strategy);

      expect(criteria.getValue()).toEqual(criterias);
    });
  });
});
