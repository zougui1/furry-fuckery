import { constructionDataSchema } from './schemas';

export class Liquid {
  static readonly schemas = {
    constructionData: constructionDataSchema,
  } as const;

  name: string;
  colors: string[];

  constructor(data: LiquidData) {
    this.name = data.name;
    this.colors = data.colors;
  }
}

export interface LiquidData {
  name: string;
  colors: string[];
}
