import { Size, SizeString } from '../size';

export class Shape {
  length: Size;
  width: Size;

  constructor(data: ShapeData) {
    this.length = Size.fromString(data.length);
    this.width = Size.fromString(data.width);
  }
}

export interface ShapeData {
  length: SizeString;
  width: SizeString;
}
