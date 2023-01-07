import { Liquid, LiquidData } from '../liquid';
import { construct } from '../../utils';

export class Wearable {
  name: string;
  colors: string[];
  stains: Liquid[];

  constructor(data: WearableData) {
    this.name = data.name;
    this.colors = data.colors;
    this.stains = data.stains?.map(stain => new Liquid(stain)) || [];
  }

  //#region static methods
  static create(data: WearableLike): Wearable {
    return construct(Wearable, data);
  }
  //#endregion
}

export interface WearableData {
  name: string;
  colors: string[];
  stains?: LiquidData[] | undefined;
}

export type WearableLike = Wearable | WearableData;
