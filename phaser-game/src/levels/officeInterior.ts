import type { LevelData } from './types'

export const officeInterior: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  spawn: {
    player: { x: 700, y: 250 },
  },

  assets: [{ key: 'office-interior', path: '/assets/sprites/interiors/office-interior.png' }],

  images: [{ key: 'office-interior', x: 400, y: 400, scale: 0.7, originX: 0.5, originY: 0.5 }],

  levelStartingDialog: {
    id: 'dialogSeen:startup',
    lines: ['Help! I am stuck in here'],
    repeat: false,
  },

  interactables: [
    {
      type: 'door',
      x: 400,
      y: 800,
      width: 90,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 400, y: 750, facing: 'down' },
    },
  ],
}
