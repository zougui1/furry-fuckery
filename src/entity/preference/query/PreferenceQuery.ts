import { Preference } from '../Preference';
import { PreferenceList } from '../PreferenceList';
import { Side, PreferenceLevel } from '../enums';
import { getType } from '../../../utils';

export class PreferenceQuery {
  preferences: PreferenceList;
  #name: string | undefined;
  #likeness: number | undefined;
  #sides: Side[] | undefined;
  #levels: PreferenceLevel[] | undefined;

  constructor(preferences: PreferenceList) {
    this.preferences = preferences;
  }

  //#region comparison
  private _compare(preference: Preference): boolean {
    /*const criterias: QueryCriteria<unknown>[] = [
      {
        search: this.#name,
        value: preference.name,
      },
      {
        search: this.#tag,
        value: preference.tag,
      },
    ];

    return criterias
      // not all criterias may be set, in this case we exclude them from the query
      .filter(criteria => criteria.search !== undefined)
      .every(criteria => criteria.search === criteria.value);*/
    return false;
  }
  //#endregion
}

type QueryCriteria<T> = {
  search: T;
  value: T;
}

const matchers = {
  string: (value: string, search: string): boolean => value === search,
  //array: (values: string, searchList: string): boolean => value === search,
};
