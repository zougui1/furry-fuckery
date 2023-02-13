import { Identity, IdentityData } from './Identity';
import { Gender, Species, Sexuality, pronouns } from '../../data';

describe('Identity', () => {
  describe('constructor', () => {
    it('should construct an identity with the provided pronouns', () => {
      const data: IdentityData = {
        name: 'Zougui',
        gender: Gender.Male,
        species: Species.Dragon,
        pronouns: pronouns.female,
        sexuality: Sexuality.Pansexual,
      };

      const identity = new Identity(data);

      expect(identity.name).toBe(data.name);
      expect(identity.gender).toBe(data.gender);
      expect(identity.pronouns).toBe(data.pronouns);
      expect(identity.species).toBe(data.species);
      expect(identity.sexuality).toBe(data.sexuality);
    });

    it('should construct an identity with pronouns corresponding to the gender when no pronouns are provided', () => {
      const data: IdentityData = {
        name: 'Zougui',
        gender: Gender.Male,
        species: Species.Dragon,
        sexuality: Sexuality.Pansexual,
      };

      const identity = new Identity(data);

      expect(identity.name).toBe(data.name);
      expect(identity.gender).toBe(data.gender);
      expect(identity.pronouns).toBe(pronouns[data.gender]);
      expect(identity.species).toBe(data.species);
      expect(identity.sexuality).toBe(data.sexuality);
    });
  });
});
