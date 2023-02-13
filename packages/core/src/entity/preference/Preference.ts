import _ from 'radash';

import { PreferenceList } from './PreferenceList';
import { normalizeData } from './utils';
import { Side, PreferenceLevel } from './enums';
import { PreferenceData, InternalPreferenceData } from './types';

export class Preference {
  readonly name: string;
  readonly description: string;
  readonly likeness: number;
  readonly sides: readonly Side[];
  readonly levels: readonly PreferenceLevel[];
  readonly children: PreferenceList;

  constructor(data: InternalPreferenceData) {
    this.name = data.name;
    this.description = data.description;
    this.likeness = data.likeness;
    this.sides = [...data.sides];
    this.levels = [...data.levels];
    this.children = new PreferenceList([...data.children]);
  }

  static create(data: PreferenceData): Preference {
    return new Preference(normalizeData(data));
  }
}
