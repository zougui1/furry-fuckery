import { z } from 'zod';

import { Size } from '../size';

export const constructionDataSchema = z.object({
  length: Size.schemas.sizeString,
  width: Size.schemas.sizeString,
});
