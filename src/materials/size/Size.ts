import { convertSize } from './convertSize';
import { parseSizeString } from './parseSizeString';
import { SizeUnit } from './SizeUnit';
import { SizeString } from './SizeString';

export class Size {
  static readonly Unit: typeof SizeUnit = SizeUnit;

  readonly unit: SizeUnit;
  readonly size: number;

  constructor(size: number, unit: SizeUnit = SizeUnit.Centimeter) {
    this.size = size;
    this.unit = unit;
  }

  //#region static methods
  static fromString(str: SizeString): Size {
    const unit = SizeUnit.Centimeter;
    const size = parseSizeString(str, unit);

    return new Size(size, unit);
  }
  //#endregion

  //#region convertion
  getMeters(): number {
    return this.getSize(SizeUnit.Meter);
  }

  getCentimeters(): number {
    return this.getSize(SizeUnit.Centimeter);
  }

  getFeet(): number {
    return this.getSize(SizeUnit.Foot);
  }

  getInches(): number {
    return this.getSize(SizeUnit.Inch);
  }

  private getSize(unit: SizeUnit): number {
    return convertSize(this.size, { from: this.unit, to: unit });
  }
  //#endregion

  //#region parsing
  toString(): string {
    return `${this.size.toFixed(2)} ${this.unit}`;
  }
  //#endregion
}
