export class Liquid {
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
