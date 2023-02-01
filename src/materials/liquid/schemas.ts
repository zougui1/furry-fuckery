import { z } from 'zod';

export const constructionDataSchema = z.object({
  name: z.string(),
  colors: z.array(z.string()),
});
