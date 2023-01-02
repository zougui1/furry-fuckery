import path from 'node:path';

import fs from 'fs-extra';

import { Entity, BodyPart } from '../entity';
import { Gender, Sexuality, Species } from '../data';

const zougui = new Entity({
  name: 'Zougui',
  gender: Gender.Male,
  sexuality: Sexuality.Pansexual,
  species: Species.Dragon,
  body: {
    length: '456 centimeters',
    width: '1 meter',
    type: BodyPart.Type.Body,
    parts: [
      {
        type: BodyPart.Type.Back,
        length: '456 centimeters',
        width: '1 meter',
        parts: [
          {
            type: BodyPart.Type.Mane,
            length: '456 centimeters',
            width: '1 meter',
          },
          {
            type: BodyPart.Type.Wing,
            tag: 'left',
            length: '456 centimeters',
            width: '1 meter',
          },
          {
            type: BodyPart.Type.Wing,
            tag: 'right',
            length: '456 centimeters',
            width: '1 meter',
          }
        ],
      },
      {
        type: BodyPart.Type.Chest,
        length: '90 centimeters',
        width: '45 centimeters',
        parts: [
          {
            type: BodyPart.Type.Neck,
            length: '125 centimeters',
            width: '24 centimeters',
            parts: [
              {
                type: BodyPart.Type.Mane,
                length: '125 centimeters',
                width: '24 centimeters',
              },
              {
                type: BodyPart.Type.Head,
                length: '85 centimeters',
                width: '24 centimeters',
                parts: [
                  {
                    type: BodyPart.Type.Mane,
                    length: '125 centimeters',
                    width: '24 centimeters',
                  },
                  {
                    type: BodyPart.Type.Horn,
                    tag: 'left',
                    length: '125 centimeters',
                    width: '24 centimeters',
                  },
                  {
                    type: BodyPart.Type.Horn,
                    tag: 'right',
                    length: '125 centimeters',
                    width: '24 centimeters',
                  },
                ],
              },
            ],
          },
          {
            type: BodyPart.Type.Leg,
            tag: 'left',
            length: '114 centimeters',
            width: '24 centimeters',
            parts: [
              {
                type: BodyPart.Type.Paw,
                tag: 'left',
                length: '114 centimeters',
                width: '24 centimeters',
                parts: [
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: BodyPart.Type.Leg,
            tag: 'right',
            length: '114 centimeters',
            width: '24 centimeters',
            parts: [
              {
                type: BodyPart.Type.Paw,
                tag: 'left',
                length: '114 centimeters',
                width: '24 centimeters',
                parts: [
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ],
      },
      {
        type: BodyPart.Type.Crotch,
        length: '90 centimeters',
        width: '45 centimeters',
        parts: [
          {
            type: BodyPart.Type.Tail,
            length: '185 centimeters',
            width: '24 centimeters',
            parts: [
              {
                type: BodyPart.Type.Mane,
                length: '125 centimeters',
                width: '24 centimeters',
              }
            ]
          },
          {
            type: BodyPart.Type.Leg,
            tag: 'left',
            length: '114 centimeters',
            width: '24 centimeters',
            parts: [
              {
                type: BodyPart.Type.Paw,
                tag: 'left',
                length: '114 centimeters',
                width: '24 centimeters',
                parts: [
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: BodyPart.Type.Leg,
            tag: 'right',
            length: '114 centimeters',
            width: '24 centimeters',
            parts: [
              {
                type: BodyPart.Type.Paw,
                tag: 'left',
                length: '114 centimeters',
                width: '24 centimeters',
                parts: [
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  },
                  {
                    type: BodyPart.Type.Digit,
                    tag: 'left',
                    length: '114 centimeters',
                    width: '24 centimeters',
                    parts: [
                      {
                        type: BodyPart.Type.Claw,
                        tag: 'left',
                        length: '114 centimeters',
                        width: '24 centimeters',
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: BodyPart.Type.Slit,
            length: '90 centimeters',
            width: '45 centimeters',
            parts: [
              {
                type: BodyPart.Type.Penis,
                length: '90 centimeters',
                width: '45 centimeters',
                parts: [
                  ...(new Array(40).fill(0).map(() => ({
                    type: BodyPart.Type.Barb,
                    length: '90 centimeters' as const,
                    width: '45 centimeters' as const,
                  }))),
                ]
              }
            ]
          },
          {
            type: BodyPart.Type.Tailhole,
            length: '90 centimeters',
            width: '45 centimeters',
          },
        ],
      },
    ],
  },
});

const dir = path.join(__dirname, '../../output');

// entity
(async () => {
  const entityFile = path.join(dir, `${zougui.name}.json`);

  await fs.ensureDir(dir);
  await fs.writeJson(entityFile, zougui, { spaces: 2 });
})();

// queries
(async () => {
  const queriesFile = path.join(dir, 'queries.json');

  await fs.writeJson(
    queriesFile,
    [
      {
        query: [
          '.query()',
          `.type(${BodyPart.Type.Leg})`,
          '.getMany()'
        ],
        result: zougui.body
          .query()
          .type(BodyPart.Type.Leg)
          .getMany(),
      },
      {
        query: [
          '.query()',
          `.type(${BodyPart.Type.Crotch})`,
          '.one()',
          `.type(${BodyPart.Type.Leg})`,
          '.getOne()'
        ],
        result: zougui.body
          .query()
          .type(BodyPart.Type.Crotch)
          .one()
          .type(BodyPart.Type.Leg)
          .getOne(),
      },
      {
        query: [
          '.query()',
          `.type(${BodyPart.Type.Crotch})`,
          '.one()',
          `.type(${BodyPart.Type.Leg})`,
          '.tag(right)',
          '.getOne()'
        ],
        result: zougui.body
          .query()
          .type(BodyPart.Type.Crotch)
          .one()
          .type(BodyPart.Type.Leg)
          .tag('right')
          .getOne(),
      },
    ],
    { spaces: 2 },
  );
})();

// query performance
(async () => {
  await new Promise(r => setTimeout(r, 100));

  const allBodyParts = [zougui.body, ...zougui.body.allParts()];
  const iterations = 1;

  console.log('body parts:', allBodyParts.length);
  console.log('iterations:', iterations);
  console.log();

  testPerf(
    [
      '.query()',
      `.type(${BodyPart.Type.Leg})`,
      '.getMany()'
    ],
    iterations,
    () => {
      zougui.body
        .query()
        .type(BodyPart.Type.Leg)
        .getMany();
    },
  );

  testPerf(
    [
      '.query()',
      `.type(${BodyPart.Type.Crotch})`,
      '.one()',
      `.type(${BodyPart.Type.Leg})`,
      '.getOne()'
    ],
    iterations,
    () => {
      zougui.body
        .query()
        .type(BodyPart.Type.Crotch)
        .one()
        .type(BodyPart.Type.Leg)
        .getOne();
    },
  );

  testPerf(
    [
      '.query()',
      `.type(${BodyPart.Type.Crotch})`,
      '.one()',
      `.type(${BodyPart.Type.Leg})`,
      '.tag(right)',
      '.getOne()'
    ],
    iterations,
    () => {
      zougui.body
        .query()
        .type(BodyPart.Type.Crotch)
        .one()
        .type(BodyPart.Type.Leg)
        .tag('right')
        .getOne();
    },
  );
})();

function testPerf(queryParts: string[], iterations: number, exec: () => unknown): void {
  exec();

  const timeLabel = 'zougui.body' + queryParts.join('');

  console.time(timeLabel);
  for (let i = iterations; i; i--) exec();
  console.timeEnd(timeLabel);
}
