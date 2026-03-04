import type { LevelData } from './types'

export const barInterior: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  spawn: {
    player: { x: 700, y: 250 },
  },

  assets: [{ key: 'bar-interior', path: '/assets/sprites/interiors/bar-interior.png' }],

  images: [{ key: 'bar-interior', x: 400, y: 400, scale: 0.7, originX: 0.5, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 700,
      width: 90,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 300, y: 1300, facing: 'down' },
    },
  ],
}
