import { z } from 'zod';

import { Gender, Species, Sexuality } from '../../data';

export const constructionDataSchema = z.object({
  name: z.string(),
  gender: z.enum(Object.values(Gender) as [Gender, ...Gender[]]),
  pronouns: z.object({
    subject: z.string(),
    object: z.string(),
    possessive: z.string(),
    possessivePronoun: z.string(),
    reflexive: z.string(),
  }).optional(),
  species: z.enum(Object.values(Species) as [Species, ...Species[]]),
  sexuality: z.enum(Object.values(Sexuality) as [Sexuality, ...Sexuality[]]),
});
