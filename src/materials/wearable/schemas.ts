import { z } from 'zod';

import { Liquid } from '../liquid';

export const constructionDataSchema = z.object({
  name: z.string(),
  colors: z.array(z.string()),
  stains: z.array(Liquid.schemas.constructionData).optional(),
});
