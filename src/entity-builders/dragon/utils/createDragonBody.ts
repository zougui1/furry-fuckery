import { BodyPartBuilder, MonoBodyPartBuilderData } from '../../body-part-builder/BodyPartBuilder';
import { BodyPart } from '../../../entity';

const dummySize: Pick<MonoBodyPartBuilderData, 'length' | 'width'> = {
  length: '100%',
  width: '100%',
};

export const createDragonBody = (): BodyPartBuilder => {
  const body = new BodyPartBuilder({ type: BodyPart.Type.Body });
  //body.addPart({ ...dummySize, type: BodyPart.Type.Belly });

  createDragonChest(body);
  //createDragonCrotch(body);
  //createDragonHips(body);
  //createDragonBack(body);

  return body;
}

const createDragonChest = (body: BodyPartBuilder): void => {
  //const chest = body.createPart({ ...dummySize, type: BodyPart.Type.Chest });

  //createDragonShoulders(chest);
  //createDragonNeck(chest);
  createDragonNeck(body);
}

const createDragonShoulders = (chest: BodyPartBuilder): void => {
  const shoulders = chest.createPart({ ...dummySize, type: BodyPart.Type.Shoulder, count: 2 });

  for (const shoulder of shoulders) {
    const arm = shoulder.createPart({ ...dummySize, type: BodyPart.Type.Arm });
    const digits = arm.createPart({ ...dummySize, type: BodyPart.Type.Digit, count: 4 });

    for (const digit of digits) {
      digit.addPart({ ...dummySize, type: BodyPart.Type.Claw });
    }
  }
}

const createDragonNeck = (chest: BodyPartBuilder): void => {
  const neck = chest.createPart({ ...dummySize, type: BodyPart.Type.Neck });
  const head = neck.createPart({ ...dummySize, type: BodyPart.Type.Head });
  head.addPart({ ...dummySize, type: BodyPart.Type.Horn, count: 2 });

  const snout = head.createPart({ ...dummySize, type: BodyPart.Type.Snout });
  const nose = snout.createPart({ ...dummySize, type: BodyPart.Type.Nose });
  nose.addPart({ ...dummySize, type: BodyPart.Type.Nostril, count: 2 });

  //const jaw = snout.createPart({ ...dummySize, type: BodyPart.Type.Jaw });
  //const maw = jaw.createPart({ ...dummySize, type: BodyPart.Type.Maw });
  //maw.addPart({ ...dummySize, type: BodyPart.Type.Tooth, count: 20 });
  //maw.addPart({ ...dummySize, type: BodyPart.Type.Tongue });
}

const createDragonCrotch = (body: BodyPartBuilder): void => {
  const crotch = body.createPart({ ...dummySize, type: BodyPart.Type.Crotch });
  const tail = crotch.createPart({ ...dummySize, type: BodyPart.Type.Tail });
  tail.addPart({ ...dummySize, type: BodyPart.Type.Tailhole });
}

const createDragonHips = (body: BodyPartBuilder): void => {
  const hips = body.createPart({ ...dummySize, type: BodyPart.Type.Hip, count: 2 });

  for (const hip of hips) {
    const leg = hip.createPart({ ...dummySize, type: BodyPart.Type.Leg });
    const digits = leg.createPart({ ...dummySize, type: BodyPart.Type.Digit, count: 3 });

    for (const digit of digits) {
      digit.addPart({ ...dummySize, type: BodyPart.Type.Claw });
    }
  }
}

const createDragonBack = (body: BodyPartBuilder): void => {
  const back = body.createPart({ ...dummySize, type: BodyPart.Type.Back });
  const wings = back.createPart({ ...dummySize, type: BodyPart.Type.Wing, count: 2 });

  for (const wing of wings) {
    wing.addPart({ ...dummySize, type: BodyPart.Type.Claw });
  }
}
