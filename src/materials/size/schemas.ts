import { z } from 'zod';

import { reSizeString } from './parseSizeString';
import { SizeString } from './SizeString';

export const sizeStringSchema: z.ZodSchema<SizeString> = z
  .string()
  .regex(reSizeString, 'Invalid size string') as z.ZodSchema<SizeString>;
