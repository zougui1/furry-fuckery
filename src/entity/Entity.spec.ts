import { Entity, EntityData } from './Entity';
import { BodyPart } from './body-part';
import { Size } from '../materials';
import { Gender, Species, Sexuality, pronouns } from '../data';

describe('Entity', () => {
  describe('constructor', () => {
    it('should construct an entity with the correct body pronouns', () => {
      const data: EntityData = {
        name: 'Zougui',
        gender: Gender.Male,
        species: Species.Dragon,
        sexuality: Sexuality.Pansexual,
        body: {
          type: BodyPart.Type.Body,
          colors: ['red'],
          length: '15 meters',
          width: '2 meters',
        },
      };

      const entity = new Entity(data);

      expect(entity.body.type).toBe(data.body.type);
      expect(entity.body.colors).toEqual(data.body.colors);
      expect(entity.body.length.unit).toBe(Size.Unit.Centimeter);
      expect(entity.body.length.value).toBe(1500);
      expect(entity.body.width.unit).toBe(Size.Unit.Centimeter);
      expect(entity.body.width.value).toBe(200);
    });

    it('should construct an entity with the provided pronouns', () => {
      const data: EntityData = {
        name: 'Zougui',
        gender: Gender.Male,
        species: Species.Dragon,
        pronouns: pronouns.female,
        sexuality: Sexuality.Pansexual,
        body: {
          type: BodyPart.Type.Body,
          colors: ['red'],
          length: '15 meters',
          width: '2 meters',
        },
      };

      const entity = new Entity(data);

      expect(entity.name).toBe(data.name);
      expect(entity.gender).toBe(data.gender);
      expect(entity.pronouns).toBe(data.pronouns);
      expect(entity.species).toBe(data.species);
      expect(entity.sexuality).toBe(data.sexuality);

      expect(entity.identity.name).toBe(data.name);
      expect(entity.identity.gender).toBe(data.gender);
      expect(entity.identity.pronouns).toBe(data.pronouns);
      expect(entity.identity.species).toBe(data.species);
      expect(entity.identity.sexuality).toBe(data.sexuality);
    });

    it('should construct an entity with pronouns corresponding to the gender when no pronouns are provided', () => {
      const data: EntityData = {
        name: 'Zougui',
        gender: Gender.Male,
        species: Species.Dragon,
        sexuality: Sexuality.Pansexual,
        body: {
          type: BodyPart.Type.Body,
          colors: ['red'],
          length: '15 meters',
          width: '2 meters',
        },
      };

      const entity = new Entity(data);

      expect(entity.name).toBe(data.name);
      expect(entity.gender).toBe(data.gender);
      expect(entity.pronouns).toBe(pronouns[data.gender]);
      expect(entity.species).toBe(data.species);
      expect(entity.sexuality).toBe(data.sexuality);

      expect(entity.identity.name).toBe(data.name);
      expect(entity.identity.gender).toBe(data.gender);
      expect(entity.identity.pronouns).toBe(pronouns[data.gender]);
      expect(entity.identity.species).toBe(data.species);
      expect(entity.identity.sexuality).toBe(data.sexuality);
    });
  });
});
