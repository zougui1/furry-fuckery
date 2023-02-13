import { convertSize } from './convertSize';
import { SizeUnit, SizeStringUnit } from './SizeUnit';

export const reSizeString = /^(-?(?:\d+)?\.?\d+) *(centimeters?|meters?|inch|inches|foot|feet)$/;

export const parseSizeString = (str: string, targetUnit: SizeUnit): number => {
  if (str.length > 100) {
    throw new Error('Value exceeds the maximum length of 100 characters.');
  }

  const match = str.match(reSizeString);

  if (!match) {
    throw new Error('Invalid size string');
  }

  const number = Number(match[1]);
  const type = match[2].toLowerCase() as SizeStringUnit;

  switch (type) {
    case SizeStringUnit.centimeter:
    case SizeStringUnit.centimeters:
      return convertSize(number, { from: SizeUnit.Centimeter, to: targetUnit });
    case SizeStringUnit.meter:
    case SizeStringUnit.meters:
      return convertSize(number, { from: SizeUnit.Meter, to: targetUnit });
    case SizeStringUnit.inch:
    case SizeStringUnit.inches:
      return convertSize(number, { from: SizeUnit.Inch, to: targetUnit });
    case SizeStringUnit.foot:
    case SizeStringUnit.feet:
      return convertSize(number, { from: SizeUnit.Foot, to: targetUnit });

    default:
      // This should never occur.
      throw new Error(`The unit ${type} was matched, but no matching case exists.`);
  }
}
