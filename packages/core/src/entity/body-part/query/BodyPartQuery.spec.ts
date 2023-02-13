import { BodyPartQuery } from './BodyPartQuery';
import { BodyPartQueryError } from './BodyPartQueryError';
import { BodyPart, BodyPartData } from '../BodyPart';
import { BodyPartType } from '../BodyPartType';

describe('BodyPartQuery', () => {
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

  describe('getOne', () => {
    describe('query by type', () => {
      it('should return undefined when no body part is found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Wing,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getOne();

        expect(result).toBeUndefined();
      });

      it('should return a body part with the correct type when found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Penis,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getOne();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
      });

      it('should return a body part with the correct type when found in a deeply nested structure', () => {
        const bodyPart = new BodyPart(getBodyPartData({
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
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getOne();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
      });
    });

    describe('query by tag', () => {
      it('should return undefined when no body part is found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          tag: 'body',
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Wing,
              tag: 'pretty',
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('sexy').getOne();

        expect(result).toBeUndefined();
      });

      it('should return a body part with the correct type and tag when found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          tag: 'body',
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Penis,
              tag: 'yummy',
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('yummy').getOne();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
        expect(result).toHaveProperty('tag', 'yummy');
      });

      it('should return a body part with the correct type and tag when found in a deeply nested structure', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          tag: 'body',
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Crotch,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Slit,
                  tag: 'deep',
                  parts: [
                    getBodyPartData({
                      type: BodyPart.Type.Penis,
                      tag: 'yummy',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('yummy').getOne();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
        expect(result).toHaveProperty('tag', 'yummy');
      });
    });
  });

  describe('getOneOrFail', () => {
    describe('query by type', () => {
      it('should throw an error when no body part is found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Wing,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const getResult = () => query.type(BodyPart.Type.Penis).getOneOrFail();

        expect(getResult).toThrowError();

        try {
          getResult();
          throw new Error('not thrown');
        } catch (error) {
          expect(error).toBeInstanceOf(BodyPartQuery.Error);
          expect(error).toHaveProperty('message', 'penis not found');
          expect(error).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
          expect(error).toHaveProperty('type', BodyPart.Type.Penis);
          expect(error).toHaveProperty('tag', undefined);
        }
      });

      it('should return a body part with the correct type when found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Penis,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getOneOrFail();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
      });

      it('should return a body part with the correct type when found in a deeply nested structure', () => {
        const bodyPart = new BodyPart(getBodyPartData({
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
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getOneOrFail();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
      });
    });

    describe('query by tag', () => {
      it('should throw an error when no body part is found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Wing,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const getResult = () => query.tag('sexy').getOneOrFail();

        expect(getResult).toThrowError();

        try {
          getResult();
          throw new Error('not thrown');
        } catch (error) {
          expect(error).toBeInstanceOf(BodyPartQuery.Error);
          expect(error).toHaveProperty('message', 'Body part not found');
          expect(error).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
          expect(error).toHaveProperty('type', undefined);
          expect(error).toHaveProperty('tag', 'sexy');
        }
      });

      it('should return a body part with the correct type and tag when found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          tag: 'body',
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Penis,
              tag: 'yummy',
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('yummy').getOneOrFail();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
        expect(result).toHaveProperty('tag', 'yummy');
      });

      it('should return a body part with the correct type and tag when found in a deeply nested structure', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          tag: 'body',
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Crotch,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Slit,
                  tag: 'deep',
                  parts: [
                    getBodyPartData({
                      type: BodyPart.Type.Penis,
                      tag: 'yummy',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('yummy').getOneOrFail();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
        expect(result).toHaveProperty('tag', 'yummy');
      });
    });
  });

  describe('getMany', () => {
    describe('query by type', () => {
      it('should return an empty array when no body part is found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Wing,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getMany();

        expect(result).toEqual([]);
      });

      it('should return all the body parts found with the given type', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
            getBodyPartData({
              type: BodyPart.Type.Slit,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'slit cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Penis).getMany();

        expect(result).toHaveLength(2);
        expect(result).toEqual(expect.arrayContaining([
          expect.objectContaining({
            type: BodyPart.Type.Penis,
            tag: 'tail cock',
          }),
          expect.objectContaining({
            type: BodyPart.Type.Penis,
            tag: 'slit cock',
          }),
        ]));
      });
    });

    describe('query by tag', () => {
      it('should return an empty array when no body part is found', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          tag: 'toto',
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Wing,
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('genital').getMany();

        expect(result).toEqual([]);
      });

      it('should return all the body parts found with the given tag', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'genital',
                }),
              ],
            }),
            getBodyPartData({
              type: BodyPart.Type.Vagina,
              tag: 'genital',
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('genital').getMany();

        expect(result).toHaveLength(2);
        expect(result).toEqual(expect.arrayContaining([
          expect.objectContaining({
            type: BodyPart.Type.Penis,
            tag: 'genital',
          }),
          expect.objectContaining({
            type: BodyPart.Type.Vagina,
            tag: 'genital',
          }),
        ]));
      });
    });
  });

  describe('one', () => {
    describe('query by type', () => {
      it('should throw an error when no body part is found on the first query', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
            getBodyPartData({
              type: BodyPart.Type.Slit,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'slit cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const getResult = () => {
          return query
            .type(BodyPart.Type.Sheath)
            .one()
            .type(BodyPart.Type.Penis)
            .getOne();
        }

        expect(getResult).toThrowError();

        try {
          getResult();
          throw new Error('not thrown');
        } catch (error) {
          expect(error).toBeInstanceOf(BodyPartQuery.Error);
          expect(error).toHaveProperty('message', 'sheath not found');
          expect(error).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
          expect(error).toHaveProperty('type', BodyPart.Type.Sheath);
          expect(error).toHaveProperty('tag', undefined);
        }
      });

      it('should return the correct body part found with the given type', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
            getBodyPartData({
              type: BodyPart.Type.Slit,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'slit cock',
                }),
              ],
            }),
            getBodyPartData({
              type: BodyPart.Type.Sheath,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'sheath cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query
          .type(BodyPart.Type.Sheath)
          .one()
          .type(BodyPart.Type.Penis)
          .getOne();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
        expect(result).toHaveProperty('tag', 'sheath cock');
      });
    });

    describe('query by tag', () => {
      it('should throw an error when no body part is found on the first query', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Vagina,
              tag: 'genital',
            }),
            getBodyPartData({
              type: BodyPart.Type.Sheath,
              tag: 'scaled sheath',
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'genital',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const getResult = () => {
          return query
            .tag('fluffy sheath')
            .one()
            .tag('genital')
            .getOne();
        }

        expect(getResult).toThrowError();

        try {
          getResult();
          throw new Error('not thrown');
        } catch (error) {
          expect(error).toBeInstanceOf(BodyPartQuery.Error);
          expect(error).toHaveProperty('message', 'Body part not found');
          expect(error).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
          expect(error).toHaveProperty('type', undefined);
          expect(error).toHaveProperty('tag', 'fluffy sheath');
        }
      });

      it('should return the correct body part found with the given tag', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Vagina,
              tag: 'genital',
            }),
            getBodyPartData({
              type: BodyPart.Type.Sheath,
              tag: 'fluffy sheath',
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'genital',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query
          .tag('fluffy sheath')
          .one()
          .tag('genital')
          .getOne();

        expect(result).toBeInstanceOf(BodyPart);
        expect(result).toHaveProperty('type', BodyPart.Type.Penis);
        expect(result).toHaveProperty('tag', 'genital');
      });
    });
  });

  describe('createError', () => {
    describe('query by type', () => {
      it('should return an error with the type we are querying', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Sheath).createError({
          message: 'sheath not found',
          code: BodyPartQuery.Error.Code.NotFound,
        });

        expect(result).toBeInstanceOf(BodyPartQuery.Error);
        expect(result).toHaveProperty('message', 'sheath not found');
        expect(result).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
        expect(result).toHaveProperty('type', BodyPart.Type.Sheath);
        expect(result).toHaveProperty('tag', undefined);
      });

      it('should return an error with the provided cause', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Sheath).createError({
          message: 'sheath not found',
          code: BodyPartQuery.Error.Code.NotFound,
          cause: new Error('something bad happened'),
        });

        // @ts-ignore for some reason Error has no property cause in test files
        const { cause } = result as BodyPartQueryError;
        expect(cause).toBeInstanceOf(Error);
        expect(cause).toHaveProperty('message', 'something bad happened');
      });
    });

    describe('query by tag', () => {
      it('should return an error with the tag we are querying', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.tag('slit').createError({
          message: 'body part not found',
          code: BodyPartQuery.Error.Code.NotFound,
        });

        expect(result).toBeInstanceOf(BodyPartQuery.Error);
        expect(result).toHaveProperty('message', 'body part not found');
        expect(result).toHaveProperty('code', BodyPartQuery.Error.Code.NotFound);
        expect(result).toHaveProperty('type', undefined);
        expect(result).toHaveProperty('tag', 'slit');
      });

      it('should return an error with the provided cause', () => {
        const bodyPart = new BodyPart(getBodyPartData({
          type: BodyPart.Type.Body,
          parts: [
            getBodyPartData({
              type: BodyPart.Type.Tail,
              parts: [
                getBodyPartData({
                  type: BodyPart.Type.Penis,
                  tag: 'tail cock',
                }),
              ],
            }),
          ],
        }));

        const query = new BodyPartQuery(bodyPart);
        const result = query.type(BodyPart.Type.Sheath).createError({
          message: 'sheath not found',
          code: BodyPartQuery.Error.Code.NotFound,
          cause: new Error('something bad happened'),
        });

        // @ts-ignore for some reason Error has no property cause in test files
        const { cause } = result as BodyPartQueryError;
        expect(cause).toBeInstanceOf(Error);
        expect(cause).toHaveProperty('message', 'something bad happened');
      });
    });
  });
});
