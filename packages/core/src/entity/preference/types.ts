import { Side, PreferenceLevel } from './enums';

export interface ChildPreferenceData {
  name: string;
  description: string;
  likeness: number;
  sides: Side[] | readonly Side[];
  levels: PreferenceLevel[] | readonly PreferenceLevel[];
}

export interface ParentPreferenceData {
  name: string;
  description: string;
  children: PreferenceData[];
}

export type PreferenceData = ChildPreferenceData | ParentPreferenceData;

export interface InternalPreferenceData extends ChildPreferenceData {
  children: InternalPreferenceData[] | readonly InternalPreferenceData[];
}
