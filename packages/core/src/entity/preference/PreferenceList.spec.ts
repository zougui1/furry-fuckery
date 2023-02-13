import { PreferenceList } from './PreferenceList';
import { Side, PreferenceLevel } from './enums';
import { Preference } from './Preference';

describe('PreferenceList', () => {
  describe('toArray', () => {
    it('should return an array of the preferences from the list', () => {
      const list = new PreferenceList([
        {
          name: 'inflation',
          description: '',
          children: [
            {
              name: 'cum',
              description: '',
              likeness: 100,
              sides: [Side.Receiving],
              levels: [PreferenceLevel.Light, PreferenceLevel.Medium],
            },
          ],
        },
        {
          name: 'cum',
          description: '',
          likeness: 100,
          sides: [Side.Receiving],
          levels: [
            PreferenceLevel.Light,
            PreferenceLevel.Medium,
            PreferenceLevel.Extreme,
          ],
        },
      ]);

      const result = list.toArray();

      expect(result).toEqual([
        Preference.create({
          name: 'inflation',
          description: '',
          children: [
            {
              name: 'cum',
              description: '',
              likeness: 100,
              sides: [Side.Receiving],
              levels: [PreferenceLevel.Light, PreferenceLevel.Medium],
            },
          ],
        }),
        Preference.create({
          name: 'cum',
          description: '',
          likeness: 100,
          sides: [Side.Receiving],
          levels: [
            PreferenceLevel.Light,
            PreferenceLevel.Medium,
            PreferenceLevel.Extreme,
          ],
        }),
      ]);
    });
  });
});
