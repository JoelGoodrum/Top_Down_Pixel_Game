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
    lines: [
      'I know Lyla, we play online games together. But I have never actually seen her...',
      'There might be something in her apartment that can help. She lives in apartment 101.',
      'And the code is 7x11. That is because she likes 7-Eleven, get it?',
    ],
    repeat: true,
  },

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 650,
      width: 64,
      height: 60,
      targetLevel: 'loftHall', // exit back outside
      targetSpawn: { x: 1020, y: 500, facing: 'down' },
    },
  ],
}
