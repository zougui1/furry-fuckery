import { normalizeData } from './normalizeData';
import { Side, PreferenceLevel } from '../enums';
import { ChildPreferenceData, ParentPreferenceData } from '../types';

describe('normalizeData', () => {
  describe('without sub-preferences', () => {
    it('should return the preference with an empty array as children', () => {
      const data: ChildPreferenceData = {
        name: 'cum',
        description: '',
        likeness: 100,
        sides: [Side.Receiving],
        levels: [
          PreferenceLevel.Light,
          PreferenceLevel.Medium,
          PreferenceLevel.Extreme,
        ],
      };

      const result = normalizeData(data);

      expect(result).toEqual({
        ...data,
        children: [],
      });
    });
  });

  describe('with sub-preferences', () => {
    it('should return the preference with likeness, sides and levels computed from its children', () => {
      const data = {
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
      } satisfies ParentPreferenceData;

      const result = normalizeData(data);

      expect(result).toEqual({
        ...data,
        children: [
          {
            ...data.children[0],
            children: [],
          },
          {
            ...data.children[1],
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
      });
    });

    it('should return the preference with likeness, sides and levels computed from its children recursively', () => {
      const data = {
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
        ]
      } satisfies ParentPreferenceData;

      const result = normalizeData(data);

      expect(result).toEqual({
        ...data,
        children: [
          {
            ...data.children[0],
            children: [
              {
                ...data.children[0].children[0],
                children: [],
              },
              {
                ...data.children[0].children[1],
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
            ...data.children[1],
            children: [
              {
                ...data.children[1].children[0],
                children: [],
              },
              {
                ...data.children[1].children[1],
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
      });
    });
  });
});
