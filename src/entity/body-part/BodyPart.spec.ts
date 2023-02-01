import { BodyPart, BodyPartData } from './BodyPart';
import { BodyPartQuery, BodyPartQueryError } from './query';
import { BodyPartType } from './BodyPartType';
import {
  Shape,
  ShapeData,
  Size,
  Wearable,
  WearableData,
  Liquid,
  LiquidData,
} from '../../materials';

describe('BodyPart', () => {
  const getBodyPartData = (options: { type: BodyPartType; tag?: string; parts?: BodyPartData[] }): BodyPartData => {
    return {
      type: options.type,
      tag: options.tag,
      parts: options.parts,
      colors: ['red'],
      length: '15 meters',
      width: '2 meters',
    };
  }

  describe('constructor', () => {
    it('should construct the body part with the provided data and default data for optional properties', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
      };

      const bodyPart = new BodyPart(data);

      expect(bodyPart.length.unit).toBe(Size.Unit.Centimeter);
      expect(bodyPart.length.value).toBe(100);
      expect(bodyPart.width.unit).toBe(Size.Unit.Centimeter);
      expect(bodyPart.width.value).toBe(30);
      expect(bodyPart.type).toBe(data.type);
      expect(bodyPart.tag).toBeUndefined();
      expect(bodyPart.colors).toEqual(data.colors);
      expect(bodyPart.wearables).toEqual([]);
      expect(bodyPart.stains).toEqual([]);
      expect(bodyPart.parts).toEqual([]);
    });

    it('should construct the body part with sub body parts', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          {
            type: BodyPart.Type.Barb,
            colors: ['red'],
            length: '2 centimeters',
            width: '0.5 centimeter',
          },
        ],
      };

      const bodyPart = new BodyPart(data);

      expect(bodyPart.parts).toEqual([
        expect.objectContaining({
          length: {
            unit: Size.Unit.Centimeter,
            value: 2,
          },
          width: {
            unit: Size.Unit.Centimeter,
            value: 0.5,
          },
          type: BodyPart.Type.Barb,
          colors: ['red'],
        }),
      ]);
    });

    it('should construct the body part with stains', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        stains: [
          {
            name: 'cum',
            colors: ['white'],
          },
        ],
      };

      const bodyPart = new BodyPart(data);

      expect(bodyPart.stains).toEqual([
        {
          name: 'cum',
          colors: ['white'],
        },
      ]);
    });

    it('should construct the body part with wearables from raw data', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        wearables: [
          {
            name: 'collar',
            colors: ['red'],
          },
        ],
      };

      const bodyPart = new BodyPart(data);

      expect(bodyPart.wearables).toEqual([
        new Wearable({
          name: 'collar',
          colors: ['red'],
        }),
      ]);
    });

    it('should construct the body part with wearables from an instance of Wearable', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        wearables: [
          new Wearable({
            name: 'collar',
            colors: ['red'],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);

      expect(bodyPart.wearables).toEqual([
        new Wearable({
          name: 'collar',
          colors: ['red'],
        }),
      ]);
    });
  });

  describe('query', () => {
    it('should query for body part with the correct type when found in a deeply nested structure', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          getBodyPartData({
            type: BodyPart.Type.Body,
            parts: [
              getBodyPartData({
                type: BodyPart.Type.Crotch,
                parts: [
                  getBodyPartData({
                    type: BodyPart.Type.Slit,
                    parts: [
                      getBodyPartData({
                        type: BodyPart.Type.Penis,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);
      const result = bodyPart.query().type(BodyPart.Type.Penis).getOne();

      expect(result).toBeInstanceOf(BodyPart);
      expect(result).toHaveProperty('type', BodyPart.Type.Penis);
    });
  });

  describe('tryQuery', () => {
    it('should return a success tuple when the query found a body part', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          getBodyPartData({
            type: BodyPart.Type.Body,
            parts: [
              getBodyPartData({
                type: BodyPart.Type.Crotch,
                parts: [
                  getBodyPartData({
                    type: BodyPart.Type.Slit,
                    parts: [
                      getBodyPartData({
                        type: BodyPart.Type.Penis,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);
      const [error, result] = bodyPart.tryQuery(query => query
        .type(BodyPart.Type.Penis)
        .getOne()
      );

      expect(error).toBeNull();
      expect(result).toBeInstanceOf(BodyPart);
      expect(result).toHaveProperty('type', BodyPart.Type.Penis);
    });

    it('should return a not found error tuple when the query did not find a body part', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          getBodyPartData({
            type: BodyPart.Type.Body,
            parts: [
              getBodyPartData({
                type: BodyPart.Type.Crotch,
                parts: [
                  getBodyPartData({
                    type: BodyPart.Type.Slit,
                    parts: [
                      getBodyPartData({
                        type: BodyPart.Type.Penis,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);
      const [error, result] = bodyPart.tryQuery(query => query
        .type(BodyPart.Type.Sheath)
        .getOneOrFail()
      );

      expect(error).toBeInstanceOf(BodyPartQuery.Error);
      expect(error).toHaveProperty('message', 'sheath not found');
      expect(error).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
      expect(error).toHaveProperty('type', BodyPart.Type.Sheath);
      expect(result).toBeNull();
    });

    it('should return an unknown error tuple when the query throws with an unknown error', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          getBodyPartData({
            type: BodyPart.Type.Body,
            parts: [
              getBodyPartData({
                type: BodyPart.Type.Crotch,
                parts: [
                  getBodyPartData({
                    type: BodyPart.Type.Slit,
                    parts: [
                      getBodyPartData({
                        type: BodyPart.Type.Penis,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);
      const [error, result] = bodyPart.tryQuery(query => {
        query.type(BodyPart.Type.Tentacle).tag('ovipositor');
        throw new Error('Too kinky');
      });

      expect(error).toBeInstanceOf(BodyPartQuery.Error);
      expect(error).toHaveProperty('message', 'Body part not found');
      expect(error).toHaveProperty('code', BodyPartQuery.Error.Code.Unknown);
      expect(error).toHaveProperty('type', BodyPart.Type.Tentacle);
      expect(error).toHaveProperty('tag', 'ovipositor');
      expect(error).toHaveProperty('cause');

      // @ts-ignore for some reason Error has no cause is test files
      const { cause } = error as BodyPartQueryError;
      expect(cause).toBeInstanceOf(Error);
      expect(cause).toHaveProperty('message', 'Too kinky');

      expect(result).toBeNull();
    });
  });

  describe('findPart', () => {
    it('should return the first part found based on the predicate', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          getBodyPartData({
            type: BodyPart.Type.Body,
            parts: [
              getBodyPartData({
                type: BodyPart.Type.Crotch,
                parts: [
                  getBodyPartData({
                    type: BodyPart.Type.Slit,
                    parts: [
                      getBodyPartData({
                        type: BodyPart.Type.Penis,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);
      const result = bodyPart.findPart(part => {
        return part.type === BodyPart.Type.Slit;
      });

      expect(result).toBeInstanceOf(BodyPart);
      expect(result).toHaveProperty('type', BodyPart.Type.Slit);
    });
  });

  describe('getAllParts', () => {
    it('should return an array of the body parts tree', () => {
      const data: BodyPartData = {
        type: BodyPart.Type.Penis,
        colors: ['red', 'orange', 'yellow'],
        length: '1 meter',
        width: '30 centimeters',
        parts: [
          getBodyPartData({
            type: BodyPart.Type.Body,
            parts: [
              getBodyPartData({
                type: BodyPart.Type.Crotch,
                parts: [
                  getBodyPartData({
                    type: BodyPart.Type.Slit,
                    parts: [
                      getBodyPartData({
                        type: BodyPart.Type.Penis,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      };

      const bodyPart = new BodyPart(data);
      const result = bodyPart.getAllParts();

      expect(result).toHaveLength(4);
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          type: BodyPart.Type.Body,
        }),
        expect.objectContaining({
          type: BodyPart.Type.Crotch,
        }),
        expect.objectContaining({
          type: BodyPart.Type.Slit,
        }),
        expect.objectContaining({
          type: BodyPart.Type.Penis,
        }),
      ]));
    });
  });
});
