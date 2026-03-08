import type { LevelData } from './types'

export const loftHall: LevelData = {
  world: {
    width: 1020,
    height: 500,
    backgroundColor: 0x000,
  },
  spawn: {
    player: { x: 50, y: 480 },
  },

  assets: [{ key: 'loft-hall', path: '/assets/sprites/interiors/loft-hall.png' }],

  images: [{ key: 'loft-hall', x: 600, y: 400, scale: 0.7, originX: 0.58, originY: 0.5 }],

  interactables: [
    {
      type: 'collider',
      x: 590,
      y: 410,
      width: 1000,
      height: 26,
    },
    {
      type: 'door',
      x: 50,
      y: 380,
      width: 70,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 1800, y: 800, facing: 'down' },
    },
    {
      type: 'door',
      x: 200,
      y: 430,
      width: 42,
      height: 60,
      targetLevel: 'room101', // exit back outside
      targetSpawn: { x: 400, y: 580, facing: 'up' },
    },
    {
      type: 'door',
      x: 920,
      y: 430,
      width: 42,
      height: 60,
      targetLevel: 'room115', // exit back outside
      targetSpawn: { x: 400, y: 580, facing: 'up' },
    },
  ],
}
