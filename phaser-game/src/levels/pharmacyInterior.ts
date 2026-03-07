import type { LevelData } from './types'

export const pharmacyInterior: LevelData = {
  world: {
    width: 800,
    height: 700,
    backgroundColor: 0x222222,
  },

  assets: [
    { key: 'pharmacy-interior', path: '/assets/sprites/interiors/pharmacy-interior.png' },
    { key: 'cigarette', path: '/assets/sprites/items/cigarette.png' },
  ],

  images: [{ key: 'pharmacy-interior', x: 600, y: 400, scale: 0.7, originX: 0.7, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 720,
      width: 200,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 1730, y: 1250, facing: 'down' },
    },
    {
      type: 'item',
      x: 400,
      y: 400,
      width: 1,
      height: 1,
      name: 'cigarette',
    },
  ],
}
