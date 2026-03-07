import type { LevelData } from './types'

export const quantumRoom: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  assets: [
    { key: 'quantum-room', path: '/assets/sprites/interiors/quantum-room.png' },
    { key: 'lever', path: '/assets/sprites/interactables/lever.png' },
    { key: 'holding-lever-right', path: '/assets/sprites/interactables/holding-lever-right.png' },
    { key: 'holding-lever-left', path: '/assets/sprites/interactables/holding-lever-left.png' },
  ],

  images: [{ key: 'quantum-room', x: 600, y: 400, scale: 0.6, originX: 0.8, originY: 0.5 }],

  levelStartingDialog: {
    id: 'dialogSeen:quantumRoom',
    lines: ['I am Lyla!', 'Please pull the lever to release me!!!'],
    repeat: false,
  },

  interactables: [
    {
      type: 'interactable',
      name: 'lever',
      spriteKey: 'lever',
      x: 400,
      y: 332,
      width: 48,
      height: 64,
      scale: 0.14,
    },
  ],
}
