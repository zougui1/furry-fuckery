import { z } from 'zod';

import { BodyPartType } from './BodyPartType';
import type { BodyPartData } from './BodyPart';
import { Shape, Wearable, Liquid } from '../../materials';

export const constructionDataSchema: z.ZodSchema<BodyPartData> = Shape.schemas.constructionData.extend({
  type: z.enum(Object.values(BodyPartType) as [BodyPartType, ...BodyPartType[]]),
  tag: z.string().optional(),
  colors: z.array(z.string()),
  wearables: z.array(Wearable.schemas.constructionData).optional(),
  stains: z.array(Liquid.schemas.constructionData).optional(),
  parts: z.array(z.lazy(() => constructionDataSchema)).optional(),
});
