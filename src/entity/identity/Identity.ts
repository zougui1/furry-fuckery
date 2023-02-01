import { constructionDataSchema } from './schemas';
import { Gender, Species, Sexuality, Pronouns, pronouns } from '../../data';

export class Identity {
  static readonly schemas = {
    constructionData: constructionDataSchema,
  } as const;

  name: string;
  gender: Gender;
  pronouns: Pronouns;
  species: Species;
  sexuality: Sexuality;

  constructor(data: IdentityData) {
    this.name = data.name;
    this.gender = data.gender;
    this.pronouns = data.pronouns || pronouns[data.gender];
    this.species = data.species;
    this.sexuality = data.sexuality;
  }
}

export interface IdentityData {
  name: string;
  gender: Gender;
  species: Species;
  sexuality: Sexuality;
  pronouns?: Pronouns | undefined;
}
