import { Preference } from './Preference';
import { PreferenceData } from './types';

export class PreferenceList {
  #preferences: Preference[] = [];

  constructor(preferences: PreferenceData[]) {
    this.#preferences = preferences.map(Preference.create);
  }

  toArray(): Preference[] {
    return [...this.#preferences];
  }
}
