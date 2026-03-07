import type { LevelData } from './types'

export const loftHall: LevelData = {
  world: {
    width: 1200,
    height: 500,
    backgroundColor: 0x222222,
  },
  spawn: {
    player: { x: 150, y: 450 },
  },

  assets: [{ key: 'loft-hall', path: '/assets/sprites/interiors/loft-hall.png' }],

  images: [{ key: 'loft-hall', x: 600, y: 400, scale: 0.7, originX: 0.5, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 140,
      y: 380,
      width: 42,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 1800, y: 800, facing: 'down' },
    },
    {
      type: 'door',
      x: 280,
      y: 430,
      width: 42,
      height: 60,
      targetLevel: 'room101', // exit back outside
      targetSpawn: { x: 400, y: 580, facing: 'up' },
    },
    {
      type: 'door',
      x: 1020,
      y: 430,
      width: 42,
      height: 60,
      targetLevel: 'room115', // exit back outside
      targetSpawn: { x: 400, y: 580, facing: 'up' },
    },
  ],
}
