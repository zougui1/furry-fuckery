import { Constructor } from 'type-fest';

import { ArrayCriteria, StringCriteria, RangeCriteria } from './typed';
import { CriteriaType } from './enums';
import {
  CriteriaItem,
  CriteriasMap,
  CriteriaValueTypeSwitch,
  GetCriteriaValueType,
  GetCriteriaStrategy,
} from './internal-types';
import { ICriteria } from './ICriteria';

export class CriteriasBuilder<
  T,
  Map extends CriteriasMap<T, string> = CriteriasMap<T, ''>,
> {
  #criterias: Map = {} as Map;

  add<
    Name extends string,
    NewCriteriaType extends CriteriaType,
    ValueType extends CriteriaValueTypeSwitch[NewCriteriaType],
    Getter extends (value: T) => ValueType
  >(
    name: Name,
    type: NewCriteriaType,
    getter: Getter,
  ): AddCriteria<T, Map, Name, NewCriteriaType, Getter> {
    const newThis = this as any as AddCriteria<T, Map, Name, NewCriteriaType, Getter>;
    // for some reason the type is messing up
    newThis.#criterias[name] = { type, getter } as any;
    return newThis;
  }

  set<Name extends Exclude<keyof Map, ''>>(
    name: Name,
    value: GetCriteriaValueType<Map, Name>,
    strategy: GetCriteriaStrategy<Map, Name>,
  ): this {
    const data = this.#criterias[name] as CriteriaItem<CriteriaType, any>;
    const Criteria = criteriasMap[data.type]
    data.criteria = new Criteria(value, strategy);

    return this;
  }

  compare(value: T): boolean {
    return Object.values(this.#criterias).every(({ criteria, getter }) => {
      if (!criteria) {
        return true;
      }

      return criteria.compare(getter(value));
    });
  }

  getCriteriaValue<Name extends Exclude<keyof Map, ''>>(
    name: Name,
  ): GetCriteriaValueType<Map, Name> | undefined {
    const data = this.#criterias[name] as CriteriaItem<CriteriaType, any>;
    return data.criteria?.getValue();
  }
}

const criteriasMap: Record<CriteriaType, Constructor<ICriteria<any>, [any, any]>> = {
  array: ArrayCriteria,
  string: StringCriteria,
  range: RangeCriteria,
};

type AddCriteria<
  T,
  Map extends CriteriasMap<T, string>,
  Name extends string,
  NewCriteriaType extends CriteriaType,
  Getter extends (value: any) => any
> = (
  CriteriasBuilder<T, Map & Record<Name, CriteriaItem<NewCriteriaType, Getter>>>
)
