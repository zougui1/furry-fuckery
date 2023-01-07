import { Entity } from '../entity';
import { Gender, Sexuality, Species } from '../data';

export class DragonBuilder {
  // TODO PartialDeep<EntityData>
  #data: any = {};

  constructor(name: string) {
    this.#data.name = name;
  }

  setGender(gender: Gender): this {
    this.#data.gender = gender;
    return this;
  }

  setSexuality(sexuality: Sexuality): this {
    this.#data.sexuality = sexuality;
    return this;
  }

  setSpecies(species: Species): this {
    this.#data.species = species;
    return this;
  }

  toEntity(): Entity {
    // TODO validate the data
    return new Entity(this.#data);
  }
}
