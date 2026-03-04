import type { LevelData } from './types'

export const quantumRoom: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [{ key: 'quantum-room', path: '/assets/sprites/interiors/quantum-room.png' }],

  images: [{ key: 'quantum-room', x: 600, y: 400, scale: 0.6, originX: 0.8, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 800,
      width: 90,
      height: 60,
      targetLevel: 'lab', // exit back outside
      targetSpawn: { x: 400, y: 400, facing: 'down' },
    },
  ],
}
