import { SizeUnit } from './SizeUnit';

const conversionData = {
  [SizeUnit.Centimeter]: {
    [SizeUnit.Centimeter]: v => v,
    [SizeUnit.Inch]: v => v / 2.54,
    [SizeUnit.Foot]: v => v / 30.48,
    [SizeUnit.Meter]: v => v / 100,
  },
  [SizeUnit.Inch]: {
    [SizeUnit.Centimeter]: v => v * 2.54,
    [SizeUnit.Inch]: v => v,
    [SizeUnit.Foot]: v => v / 12,
    [SizeUnit.Meter]: v => v / 39.37,
  },
  [SizeUnit.Foot]: {
    [SizeUnit.Centimeter]: v => v * 30.48,
    [SizeUnit.Inch]: v => v * 12,
    [SizeUnit.Foot]: v => v,
    [SizeUnit.Meter]: v => v / 3.281,
  },
  [SizeUnit.Meter]: {
    [SizeUnit.Centimeter]: v => v * 100,
    [SizeUnit.Inch]: v => v * 39.37,
    [SizeUnit.Foot]: v => v * 3.281,
    [SizeUnit.Meter]: v => v,
  },
} satisfies Record<SizeUnit, Record<SizeUnit, (value: number) => number>>;

export const convertSize = (length: number, { from, to }: { from: SizeUnit, to: SizeUnit }): number => {
  return conversionData[from][to](length);
}
