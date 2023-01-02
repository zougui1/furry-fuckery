import { Entity, BodyPart } from '../entity';

const entity = new Entity({} as any);

// BodyPart | undefined
{
  const knot = entity.body.query()
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Knot)
    .getOne();

  if(knot) {
    knot.type;
  } else {
    // knot is undefined
    // @ts-expect-error
    knot.type;
  }
}

// BodyPart
{
  const knot = entity.body.query()
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Knot)
    .getOneOrFail();

  if (knot) {
    knot.type
  } else {
    // since knot is expected to be defined this case here is not possible
    // @ts-expect-error
    knot.type;
  }
}

// Error or BodyPart
{
  const [error, knot] = entity.body.tryQuery(query => query
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Knot)
    .getOneOrFail()
  );

  if (error) {
    console.log(error.message);
  } else if(knot) {
    knot.type;
  } else {
    // since knot is expected to be defined this case here is not possible
    // @ts-expect-error
    knot.type;
  }
}

// Error or BodyPart | undefined
{
  const [error, knot] = entity.body.tryQuery(query => query
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Crotch)
    .one()
    .type(BodyPart.Type.Knot)
    .getOne()
  );

  if (error) {
    console.log(error.message);
  } else if(knot) {
    knot.type;
  } else {
    // knot is undefined
    // @ts-expect-error
    knot.type;
  }
}
