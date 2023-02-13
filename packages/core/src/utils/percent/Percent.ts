import { isNumber } from 'radash';

const rePercent = /^-?[0-9]+%$/;

export namespace Percent {
  export type StringType = `${number}%`;

  export const fromString = (string: StringType): number => {
    const number = Number(string.slice(0, -1));

    if (!isNumber(number)) {
      throw new Error(`Invalid percent string: ${string}`);
    }

    return number;
  }

  export const toString = (number: number): StringType => {
    return `${number}%`;
  }

  export const fromMultiplier = (multiplier: number): number => {
    return multiplier * 100;
  }

  export const toMultiplier = (percent: number): number => {
    return percent / 100;
  }

  export const apply = (percent: StringType, number: number): number => {
    const multiplier = toMultiplier(fromString(percent));
    return number * multiplier;
  }

  export const tryApply = (percent: string, number: number): number | undefined => {
    try {
      return apply(percent as StringType, number);
    } catch {
      return undefined;
    }
  }

  export const isValidString = (string: string): string is StringType => {
    return rePercent.test(string);
  }
}
