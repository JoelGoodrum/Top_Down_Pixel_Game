import type { LevelData } from './types'

export const room101: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [
    { key: 'room101', path: '/assets/sprites/interiors/room101.png' },
    { key: 'keyCard', path: '/assets/sprites/items/keyCard.png' },
  ],

  images: [{ key: 'room101', x: 600, y: 400, scale: 0.5, originX: 0.75, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 650,
      width: 90,
      height: 60,
      targetLevel: 'loftHall', // exit back outside
      targetSpawn: { x: 280, y: 500, facing: 'down' },
    },
    {
      type: 'item',
      x: 650,
      y: 500,
      width: 1,
      height: 1,
      name: 'keyCard',
    },
  ],
}
