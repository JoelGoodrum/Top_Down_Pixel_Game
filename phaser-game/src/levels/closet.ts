import type { LevelData } from './types'

export const closet: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [
    { key: 'closet', path: '/assets/sprites/interiors/closet.png' },
    { key: 'coat', path: '/assets/sprites/items/coat.png' },
  ],

  images: [{ key: 'closet', x: 600, y: 400, scale: 0.4, originX: 0.85, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 720,
      width: 64,
      height: 60,
      targetLevel: 'towerHall', // exit back outside
      targetSpawn: { x: 700, y: 500, facing: 'down' },
    },
    {
      type: 'item',
      x: 400,
      y: 400,
      width: 1,
      height: 1,
      name: 'coat',
    },
  ],
}
