import { StringCriteria } from './StringCriteria';

describe('StringCriteria', () => {
  describe('compare', () => {
    describe('Strategy.Includes', () => {
      const strategy = StringCriteria.Strategy.Includes;

      it('should return false when no criterias match the value', () => {
        const criterias = ['receiving', 'giving'];
        const value = 'neutral';

        const criteria = new StringCriteria(criterias, strategy);

        expect(criteria.compare(value)).toBe(false);
      });

      it('should return true when at least 1 criteria matches the value', () => {
        const criterias = ['receiving', 'giving'];
        const value = 'receiving';

        const criteria = new StringCriteria(criterias, strategy);

        expect(criteria.compare(value)).toBe(true);
      });
    });
  });

  describe('getValue', () => {
    const strategy = StringCriteria.Strategy.Includes;

    it('should return the values given to the criteria', () => {
      const criterias = ['receiving', 'giving'];
      const criteria = new StringCriteria(criterias, strategy);

      expect(criteria.getValue()).toEqual(criterias);
    });
  });
});
