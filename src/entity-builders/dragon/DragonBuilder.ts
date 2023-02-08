import { SetOptional } from 'type-fest';

import { createDragonBody } from './utils';
import { EntityBuilder, KnownBodyPartData } from '../EntityBuilder';
import {
  BodyPartBuilderData,
  MultiBodyPartBuilderData,
} from '../BodyPartBuilder';
import { BodyPart, BodyPartType } from '../../entity';
import { Species } from '../../data';

export class DragonBuilder extends EntityBuilder {
  constructor(name: string) {
    super(name);

    this.body = createDragonBody();
    this.setSpecies(Species.Dragon);
  }

  //#region body
  setBody(data: KnownBodyPartData): this {
    this.body.merge(data);
    return this;
  }

  setNeck(data: MonoPartData): this {
    return this._mergeMonoPart(BodyPart.Type.Neck, data);
  }

  setHead(data: MonoPartData): this {
    return this._mergeMonoPart(BodyPart.Type.Head, data);
  }

  setSnout(data: MonoPartData): this {
    return this._mergeMonoPart(BodyPart.Type.Snout, data);
  }

  setNose(data: MonoPartData): this {
    return this._mergeMonoPart(BodyPart.Type.Nose, data);
  }

  setNostrils(data: MultiPartsData): this {
    return this._mergeMultiParts(BodyPart.Type.Nostril, data);
  }

  setHorns(data: MultiPartsData): this {
    return this._mergeMultiParts(BodyPart.Type.Horn, data);
  }

  private _mergeMonoPart(type: BodyPartType, data: BodyPartBuilderData): this {
    this.body
      .query()
      .type(type)
      .getOneOrFail()
      .merge(data);

    return this;
  }

  private _mergeMultiParts(type: BodyPartType, data: MultiPartsData): this {
    this.body
      .query()
      .type(type)
      .getMany()
      .forEach(part => part.merge(data));

    return this;
  }
  //#endregion
}

type MonoPartData = BodyPartBuilderData;
type MultiPartsData = SetOptional<MultiBodyPartBuilderData, 'count'>;
