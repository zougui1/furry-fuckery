import { CriteriaType } from './enums';
import { ArrayCriteriaStrategy } from './typed/ArrayCriteria';
import { StringCriteriaStrategy } from './typed/StringCriteria';
import { RangeCriteriaStrategy, Range } from './typed/RangeCriteria';
import { ICriteria } from './ICriteria';

export type CriteriaItem<Type extends CriteriaType, Getter extends (value: any) => any> = {
  type: Type;
  criteria?: ICriteria<unknown, ReturnType<Getter>> | undefined;
  getter: Getter;
}

export type CriteriasMap<T, Keys extends string = string> = (
  Record<Keys, CriteriaItem<never, (value: T) => unknown>>
);

//#region switches for types of criteria
const criteriaValueTypeSwitch = {
  array: [] as unknown[] | readonly unknown[],
  string: '' as string | undefined,
  range: 0,
} satisfies Record<CriteriaType, unknown>;

const criteriaStrategyTypeSwitch = {
  array: ArrayCriteriaStrategy.Any as ArrayCriteriaStrategy,
  string: StringCriteriaStrategy.Includes as StringCriteriaStrategy,
  range: RangeCriteriaStrategy.Bounded as RangeCriteriaStrategy,
} satisfies Record<CriteriaType, unknown>;

/**
 * the return type is the type used for the criteria parameter of the method `set` of `CriteriasBuilder`
 */
export type AcceptableTypeSwitch<T> = {
  array: (value: T) => T,
  string: (value: T) => T[],
  range: (value: Range) => Range,
};
//#endregion

export type CriteriaStrategyTypeSwitch = typeof criteriaStrategyTypeSwitch;
export type CriteriaValueTypeSwitch = typeof criteriaValueTypeSwitch;

export type GetCriteriaValueType<
  Map extends CriteriasMap<any>,
  Name extends keyof Map,
  Criteria extends Map[Name] = Map[Name]
> = (
  ReturnType<AcceptableTypeSwitch<ReturnType<Criteria['getter']>>[Criteria['type']]>
)

export type GetCriteriaStrategy<
  Map extends CriteriasMap<any>,
  Name extends keyof Map,
  Criteria extends Map[Name] = Map[Name]
> = (
  CriteriaStrategyTypeSwitch[Criteria['type']]
)
