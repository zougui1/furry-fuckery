import { Identity, IdentityData } from './Identity';
import { BodyPart, BodyPartData } from './body-part';
import { Gender, Species, Sexuality, Pronouns } from '../data';

export class Entity {
  readonly identity: Identity;
  body: BodyPart;

  constructor(data: EntityData) {
    this.identity = new Identity(data);
    this.body = new BodyPart(data.body);
  }

  //#region getters
  //#region identity
  get name(): string {
    return this.identity.name;
  }

  get gender(): Gender {
    return this.identity.gender;
  }

  get pronouns(): Pronouns {
    return this.identity.pronouns;
  }

  get species(): Species {
    return this.identity.species;
  }

  get sexuality(): Sexuality {
    return this.identity.sexuality;
  }
  //#endregion
  //#endregion
}

export interface EntityData extends IdentityData {
  body: BodyPartData;
}
