import { ArrayCriteria } from './ArrayCriteria';

describe('ArrayCriteria', () => {
  describe('compare', () => {
    describe('Strategy.Any', () => {
      const strategy = ArrayCriteria.Strategy.Any;

      it('should return false when no criterias are found in any of the values', () => {
        const criterias = ['receiving', 'giving'];
        const values = ['neutral'];

        const criteria = new ArrayCriteria(criterias, strategy);

        expect(criteria.compare(values)).toBe(false);
      });

      it('should return true when at least 1 criteria is found in any of the values', () => {
        const criterias = ['receiving', 'giving'];
        const values = ['receiving'];

        const criteria = new ArrayCriteria(criterias, strategy);

        expect(criteria.compare(values)).toBe(true);
      });
    });

    describe('Strategy.Every', () => {
      const strategy = ArrayCriteria.Strategy.Every;

      it('should return false when no criterias are found in the values', () => {
        const criterias = ['receiving', 'giving'];
        const values = ['neutral'];

        const criteria = new ArrayCriteria(criterias, strategy);

        expect(criteria.compare(values)).toBe(false);
      });

      it('should return false when at least 1 criteria is found in the values', () => {
        const criterias = ['receiving', 'giving'];
        const values = ['receiving'];

        const criteria = new ArrayCriteria(criterias, strategy);

        expect(criteria.compare(values)).toBe(false);
      });

      it('should return true when all the criterias are found in the values', () => {
        const criterias = ['receiving', 'giving'];
        const values = ['receiving', 'giving', 'neutral'];

        const criteria = new ArrayCriteria(criterias, strategy);

        expect(criteria.compare(values)).toBe(true);
      });
    });
  });

  describe('getValue', () => {
    const strategy = ArrayCriteria.Strategy.Any;

    it('should return the values given to the criteria', () => {
      const criterias = ['giving', 'receiving'];
      const criteria = new ArrayCriteria(criterias, strategy);

      expect(criteria.getValue()).toEqual(criterias);
    });
  });
});
