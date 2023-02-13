import { convertSize } from './convertSize';
import { parseSizeString } from './parseSizeString';
import { sizeStringSchema } from './schemas';
import { SizeUnit } from './SizeUnit';
import { SizeString } from './SizeString';

export class Size {
  static readonly Unit = SizeUnit;
  static readonly schemas = {
    sizeString: sizeStringSchema,
  } as const;

  readonly value: number;
  readonly unit: SizeUnit;

  constructor(size: number, unit: SizeUnit = SizeUnit.Centimeter) {
    this.value = size;
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
    return convertSize(this.value, { from: this.unit, to: unit });
  }
  //#endregion

  //#region parsing
  toString(): SizeString {
    const [, decimals = ''] = String(this.value).split('.');
    const value = decimals.length > 2
      ? Number(this.value.toFixed(2))
      : this.value;

    return `${value} ${this.unit}`;
  }
  //#endregion
}
