import { Identity } from './identity';
import { BodyPart } from './body-part';

export const constructionDataSchema = Identity.schemas.constructionData.extend({
  body: BodyPart.schemas.constructionData,
});
