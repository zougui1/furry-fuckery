import { SetOptional } from 'type-fest';

import { EntityBuilder, KnownBodyPartData } from './EntityBuilder';
import {
  BodyPartBuilder,
  BodyPartBuilderData,
  MultiBodyPartBuilderData,
} from './BodyPartBuilder';
import { BodyPart } from '../entity';
import { Species } from '../data';

export class DragonBuilder extends EntityBuilder {
  constructor(name: string) {
    super(name);

    this.setSpecies(Species.Dragon);
  }

  //#region body
  setBody(data: KnownBodyPartData): this {
    this.body = new BodyPartBuilder({
      ...this.body,
      ...data,
      type: BodyPart.Type.Body,
    });

    return this;
  }

  /**
   * since the neck is an important part of a dragon and the head is attached to it
   * we directly define the head here
   */
  setNeck(data: NeckData): this {
    this.body.addPart({
      ...data,
      type: BodyPart.Type.Neck,
      parts: [
        {
          ...data.head,
          type: BodyPart.Type.Head,
          parts: [
            {
              count: 2,
              ...data.head.horns,
              type: BodyPart.Type.Horn,
            },
            {
              ...data.head.snout,
              type: BodyPart.Type.Snout,
              parts: [
                {
                  ...data.head.snout.nose,
                  type: BodyPart.Type.Nose,
                  parts: [
                    {
                      count: 2,
                      ...data.head.snout.nose.nostrils,
                      type: BodyPart.Type.Nostril,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return this;
  }
  //#endregion
}

type NeckData = BodyPartBuilderData & {
  head: BodyPartBuilderData & {
    horns: SetOptional<MultiBodyPartBuilderData, 'count'>;
    snout: BodyPartBuilderData & {
      nose: BodyPartBuilderData & {
        nostrils: SetOptional<MultiBodyPartBuilderData, 'count'>;
      };
    };
  };
};
