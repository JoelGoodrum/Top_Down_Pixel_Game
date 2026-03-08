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

  images: [{ key: 'lab', x: 600, y: 400, scale: 0.78, originX: 0.75, originY: 0.5 }],

  interactables: [
    {
      type: 'collider',
      x: 400,
      y: 310,
      width: 800,
      height: 100,
    },
    {
      type: 'door',
      x: 400,
      y: 800,
      width: 150,
      height: 60,
      targetLevel: 'towerHall', // exit back outside
      targetSpawn: { x: 240, y: 450, facing: 'down' },
    },
    {
      type: 'door',
      x: 400,
      y: 330,
      width: 180,
      height: 60,
      targetLevel: 'quantumRoom', // exit back outside
      targetSpawn: { x: 400, y: 590, facing: 'up' },
    },
    {
      type: 'npc',
      id: 'lab-npc',
      x: 620,
      y: 420,
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
