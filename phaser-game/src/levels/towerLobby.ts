import type { LevelData } from './types'

export const towerLobby: LevelData = {
  world: {
    width: 1000,
    height: 610,
    backgroundColor: 0x222222,
  },

  assets: [{ key: 'tower-lobby', path: '/assets/sprites/interiors/tower-lobby.png' }],

  images: [{ key: 'tower-lobby', x: 600, y: 400, scale: 0.5, originX: 0.75, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 650,
      width: 200,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 1100, y: 800, facing: 'down' },
    },
    {
      type: 'door',
      x: 400,
      y: 320,
      width: 100,
      height: 60,
      targetLevel: 'towerHall', // exit back outside
      targetSpawn: { x: 550, y: 450, facing: 'down' },
    },
  ],
}
