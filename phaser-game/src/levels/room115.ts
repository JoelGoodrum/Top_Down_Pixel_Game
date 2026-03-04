import type { LevelData } from './types'

export const room115: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [{ key: 'room115', path: '/assets/sprites/interiors/room115.png' }],

  images: [{ key: 'room115', x: 600, y: 400, scale: 0.5, originX: 0.75, originY: 0.5 }],

  levelStartingDialog: {
    id: 'dialogSeen:room115',
    lines: ['I know Lyla, we play online games together'],
    repeat: true,
  },

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 650,
      width: 90,
      height: 60,
      targetLevel: 'loftHall', // exit back outside
      targetSpawn: { x: 1020, y: 500, facing: 'down' },
    },
  ],
}
