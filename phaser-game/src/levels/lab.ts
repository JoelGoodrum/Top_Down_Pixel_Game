import type { LevelData } from './types'

export const lab: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [{ key: 'lab', path: '/assets/sprites/interiors/lab.png' }],

  images: [{ key: 'lab', x: 600, y: 400, scale: 0.6, originX: 0.85, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 720,
      width: 64,
      height: 60,
      targetLevel: 'towerHall', // exit back outside
      targetSpawn: { x: 100, y: 500, facing: 'down' },
    },
    {
      type: 'door',
      x: 400,
      y: 300,
      width: 64,
      height: 60,
      targetLevel: 'quantumRoom', // exit back outside
      targetSpawn: { x: 400, y: 700, facing: 'up' },
    },
  ],
}
