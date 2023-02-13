import path from 'node:path';

import fs from 'fs-extra';

import { DragonBuilder } from './DragonBuilder';
import { Gender, Sexuality, Species } from '../../data';

describe('DragonBuilder', () => {
  describe('toEntity', () => {
    it('should construct a dragon entity', () => {
      const name = 'Zougui';
      const gender = Gender.Male;
      const sexuality = Sexuality.Pansexual;
      const species = Species.Dragon;

      const dragon = new DragonBuilder(name)
        .setGender(gender)
        .setSexuality(sexuality)
        .setBody({
          length: '40 meters',
          width: '3 meters',
          colors: ['grey'],
        })
        .setNeck({ length: '15%', width: '0.5 meter' })
        .setHead({ length: '15%', width: '0.6 meter' })
        .setHorns({ length: '1 meter', width: '0.6 meter' })
        .setSnout({ length: '1 meter', width: '0.6 meter' })
        .setNose({ length: '1 meter', width: '0.6 meter' })
        .setNostrils({ length: '1 meter', width: '0.6 meter' })
        .toEntity();

      expect(dragon.name).toBe(name);
      expect(dragon.gender).toBe(gender);
      expect(dragon.sexuality).toBe(sexuality);
      expect(dragon.species).toBe(species);

      // if you want to see the build entity
      //! DO NOT PUSH THIS FILE
      fs.writeJsonSync(path.join(__dirname, 'dragon.json'), dragon, { spaces: 2 });

      const expected = fs.readJsonSync(path.join(__dirname, '_dragon.json'));
      const received = fs.readJsonSync(path.join(__dirname, 'dragon.json'));

      expect(received).toEqual(expected);
    });
  });
});
