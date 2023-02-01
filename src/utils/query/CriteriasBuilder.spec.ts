import { CriteriasBuilder } from './CriteriasBuilder';
import { CriteriaType } from './enums';
import {
  ArrayCriteriaStrategy,
  RangeCriteriaStrategy,
  StringCriteriaStrategy,
} from './typed';
import { Preference } from '../../entity/preference/Preference';
import { Side, PreferenceLevel } from '../../entity/preference/enums';

describe('CriteriasBuilder', () => {
  describe('compare', () => {
    it('should return true', () => {
      const criterias = new CriteriasBuilder<Preference>()
        .add('sides', CriteriaType.Array, pref => pref.sides)
        .add('levels', CriteriaType.Array, pref => pref.levels)
        .add('likeness', CriteriaType.Range, pref => pref.likeness)
        .add('name', CriteriaType.String, pref => pref.name);

      const pref = Preference.create({
        name: 'watersports',
        description: 'watersports',
        likeness: 50,
        levels: [PreferenceLevel.Light, PreferenceLevel.Medium, PreferenceLevel.Extreme],
        sides: [Side.Receiving],
      });

      criterias.set('sides', [Side.Receiving], ArrayCriteriaStrategy.Any);
      criterias.set('levels', [PreferenceLevel.Medium, PreferenceLevel.Extreme], ArrayCriteriaStrategy.Every);
      criterias.set('likeness', { min: 5, max: 100 }, RangeCriteriaStrategy.Unbounded);

      expect(criterias.compare(pref)).toBe(true);
    });
  });

  describe('getCriteriaValue', () => {
    it('should return undefined when the criteria has no value', () => {
      const criterias = new CriteriasBuilder<Preference>()
        .add('name', CriteriaType.String, pref => pref.name);

      expect(criterias.getCriteriaValue('name')).toBeUndefined();
    });

    it('should return the value of the criteria when it has one', () => {
      const criterias = new CriteriasBuilder<Preference>()
        .add('name', CriteriaType.String, pref => pref.name);

      criterias.set('name', ['watersports'], StringCriteriaStrategy.Includes);

      expect(criterias.getCriteriaValue('name')).toEqual(['watersports']);
    });
  });
});

/*describe('CriteriasBuilder (BodyPart)', () => {
  const criterias = new CriteriasBuilder<BodyPart>()
    .add('type', CriteriaType.String, part => part.type);

  criterias.set('type', [BodyPart.Type.Arm], StringCriteriaStrategy.Includes);
});

describe('CriteriasBuilder (Preference)', () => {
  const criterias = new CriteriasBuilder<Preference>()
    .add('sides', CriteriaType.Array, pref => pref.sides);

  criterias.set('sides', [Side.Giving], ArrayCriteriaStrategy.Every);

  criterias.compare(new Preference({} as any));


  criterias.set('type', [Side.Giving], ArrayCriteriaStrategy.Every);
  criterias.set('sides', [Side.Giving], StringCriteriaStrategy.Includes);
  criterias.set('sides', [BodyPart.Type.Arm], ArrayCriteriaStrategy.Every);
  criterias.set('sides', Side.Giving, ArrayCriteriaStrategy.Every);

  criterias.compare(new BodyPart({} as any));
});

describe('CriteriasBuilder', () => {
  const criterias = new CriteriasBuilder<Preference>()
    .add('sides', CriteriaType.String, pref => pref.sides);
});*/
