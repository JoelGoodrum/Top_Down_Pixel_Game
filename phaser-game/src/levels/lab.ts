import type { LevelData } from './types'

export const lab: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [
    { key: 'lab', path: '/assets/sprites/interiors/lab.png' },
    { key: 'lab-npc', path: '/assets/sprites/NPCs/lab-npc.png' },
  ],

  images: [{ key: 'lab', x: 600, y: 400, scale: 0.6, originX: 0.85, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 380,
      y: 720,
      width: 100,
      height: 60,
      targetLevel: 'towerHall', // exit back outside
      targetSpawn: { x: 240, y: 450, facing: 'down' },
    },
    {
      type: 'door',
      x: 380,
      y: 350,
      width: 100,
      height: 60,
      targetLevel: 'quantumRoom', // exit back outside
      targetSpawn: { x: 400, y: 590, facing: 'up' },
    },
    {
      type: 'npc',
      id: 'lab-npc',
      x: 500,
      y: 400,
      width: 140,
      height: 140,
      spriteKey: 'lab-npc',
      dialog: [
        'Lyla, our test subject has become unpredictable.',
        'Maybe we need to increase the voltage.',
      ],
    },
  ],
}
