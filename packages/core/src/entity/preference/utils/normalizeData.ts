import { unique } from 'radash';

import { PreferenceData, InternalPreferenceData } from '../types';
import { average } from '../../../utils';

export const normalizeData = (data: PreferenceData): InternalPreferenceData => {
  if (!('children' in data)) {
    return {
      ...data,
      children: [],
    };
  }

  const children = data.children.map(normalizeData);

  const likeness = average(children, child => child.likeness);
  const sides = unique(children.flatMap(child => child.sides));
  const levels = unique(children.flatMap(child => child.levels));

  return {
    ...data,
    likeness,
    sides,
    levels,
    children,
  };
}
