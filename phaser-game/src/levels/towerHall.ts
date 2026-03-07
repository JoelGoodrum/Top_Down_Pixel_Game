import type { LevelData } from './types'

export const towerHall: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [{ key: 'tower-hall', path: '/assets/sprites/interiors/tower-hall.png' }],

  images: [{ key: 'tower-hall', x: 600, y: 400, scale: 0.7, originX: 0.7, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 100,
      y: 400,
      width: 64,
      height: 60,
      targetLevel: 'lab', // exit back outside
      targetSpawn: { x: 400, y: 650, facing: 'up' },
    },
    {
      type: 'door',
      x: 400,
      y: 400,
      width: 64,
      height: 60,
      targetLevel: 'towerLobby', // exit back outside
      targetSpawn: { x: 400, y: 400, facing: 'down' },
    },
    {
      type: 'door',
      x: 700,
      y: 400,
      width: 64,
      height: 60,
      targetLevel: 'closet', // exit back outside
      targetSpawn: { x: 400, y: 600, facing: 'up' },
    },
  ],
}
