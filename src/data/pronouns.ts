import { Gender } from './Gender';

export const pronouns = {
  male: {
    subject: 'he',
    object: 'him',
    possessive: 'his',
    possessivePronoun: 'his',
    reflexive: 'himself',
  },
  female: {
    subject: 'she',
    object: 'her',
    possessive: 'her',
    possessivePronoun: 'hers',
    reflexive: 'herself',
  },
  herm: {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    possessivePronoun: 'their',
    reflexive: 'themselves',
  },
  maleherm: {
    subject: 'he',
    object: 'him',
    possessive: 'his',
    possessivePronoun: 'his',
    reflexive: 'himself',
  },
  nonbinary: {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    possessivePronoun: 'their',
    reflexive: 'themselves',
  },
  genderfluid: {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    possessivePronoun: 'their',
    reflexive: 'themselves',
  },
} satisfies Record<Gender, Pronouns>;

export interface Pronouns {
  subject: string;
  object: string;
  possessive: string;
  possessivePronoun: string;
  reflexive: string;
}
