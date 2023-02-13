import { Preference } from './Preference';
import { Side, PreferenceLevel } from './enums';
import {
  ChildPreferenceData,
  ParentPreferenceData,
  InternalPreferenceData,
  PreferenceData,
} from './types';
import { normalizeData } from './utils'

describe('Preference', () => {
  describe('constructor', () => {
    it('should construct a complexe preference object', () => {
      const data: InternalPreferenceData = {
        name: 'humiliation',
        description: '',
        children: [
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
                children: [],
              },
              {
                name: 'watersports',
                description: '',
                likeness: 0,
                sides: [Side.Receiving, Side.Giving],
                levels: [
                  PreferenceLevel.Light,
                  PreferenceLevel.Medium,
                  PreferenceLevel.Extreme,
                ],
                children: [],
              },
            ],
            likeness: 50,
            sides: [Side.Receiving, Side.Giving],
            levels: [
              PreferenceLevel.Light,
              PreferenceLevel.Medium,
              PreferenceLevel.Extreme,
            ],
          },
          {
            name: 'marking',
            description: '',
            children: [
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
                children: [],
              },
              {
                name: 'watersports',
                description: '',
                likeness: 40,
                sides: [Side.Receiving, Side.Giving],
                levels: [PreferenceLevel.Light, PreferenceLevel.Medium],
                children: [],
              },
            ],
            likeness: 70,
            sides: [Side.Receiving, Side.Giving],
            levels: [
              PreferenceLevel.Light,
              PreferenceLevel.Medium,
              PreferenceLevel.Extreme,
            ],
          },
        ],
        likeness: 60,
        sides: [Side.Receiving, Side.Giving],
        levels: [
          PreferenceLevel.Light,
          PreferenceLevel.Medium,
          PreferenceLevel.Extreme,
        ],
      };

      const result = new Preference(data);

      expect(result.name).toBe(data.name);
      expect(result.description).toBe(data.description);
      expect(result.likeness).toBe(data.likeness);
      expect(result.sides).toEqual(data.sides);
      expect(result.levels).toEqual(data.levels);
      expect(result.children.toArray()).toHaveLength(2);
    });
  });

  describe('static create', () => {
    it('should construct a complexe preference object with normalized data', () => {
      const data: PreferenceData = {
        name: 'humiliation',
        description: '',
        children: [
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
              {
                name: 'watersports',
                description: '',
                likeness: 0,
                sides: [Side.Receiving, Side.Giving],
                levels: [
                  PreferenceLevel.Light,
                  PreferenceLevel.Medium,
                  PreferenceLevel.Extreme,
                ],
              },
            ],
          },
          {
            name: 'marking',
            description: '',
            children: [
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
              {
                name: 'watersports',
                description: '',
                likeness: 40,
                sides: [Side.Receiving, Side.Giving],
                levels: [PreferenceLevel.Light, PreferenceLevel.Medium],
              },
            ],
          },
        ],
      };

      const result = Preference.create(data);

      expect(result.name).toBe(data.name);
      expect(result.description).toBe(data.description);
      expect(result.likeness).toBe(60);
      expect(result.sides).toEqual([Side.Receiving, Side.Giving]);
      expect(result.levels).toEqual([
        PreferenceLevel.Light,
        PreferenceLevel.Medium,
        PreferenceLevel.Extreme,
      ]);
      expect(result.children.toArray()).toHaveLength(2);
    });
  });
});
