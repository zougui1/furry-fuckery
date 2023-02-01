import { PartialDeep } from 'type-fest';

import { BodyPartBuilder } from './BodyPartBuilder';
import { Entity, IdentityData, BodyPartData, BodyPartType } from '../entity';
import { Gender, Sexuality, Species } from '../data';

export abstract class EntityBuilder {
  protected identity: PartialDeep<IdentityData> = {};
  protected body: BodyPartBuilder;

  constructor(name: string) {
    this.identity.name = name;
    this.body = new BodyPartBuilder({ type: BodyPartType.Body });
  }

  //#region identity
  setGender(gender: Gender): this {
    this.identity.gender = gender;
    return this;
  }

  setSexuality(sexuality: Sexuality): this {
    this.identity.sexuality = sexuality;
    return this;
  }

  setSpecies(species: Species): this {
    this.identity.species = species;
    return this;
  }
  //#endregion

  //#region body
  abstract setBody(data: KnownBodyPartData): this;

  toEntity(): Entity {
    const result = Entity.schemas.constructionData.parse({
      ...this.identity,
      body: this.body.toObject(),
    });
    return new Entity(result);
  }
}

export type KnownBodyPartData = Omit<BodyPartData, 'type'>;
