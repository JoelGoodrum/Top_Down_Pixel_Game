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

  levelStartingDialog: {
    id: 'dialogSeen:bar',
    lines: [
      'That is a very strange message you have.',
      'Could that be the CEOs daughter?',
      'No way...',
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
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 330, y: 1250, facing: 'down' },
    },
  ],
}
