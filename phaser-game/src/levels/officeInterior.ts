import type { LevelData } from './types'
import { SCALE } from '../config/constants'

export const officeInterior: LevelData = {
  world: {
    width: 1200,
    height: 800,
    backgroundColor: 0x222222,
  },

  spawn: {
    player: { x: 600, y: 650 },
  },

  assets: [{ key: 'office-interior', path: '/assets/sprites/interiors/office-interior.png' }],

  images: [{ key: 'office-interior', x: 600, y: 400, scale: 1, originX: 0.5, originY: 0.5 }],

  interactables: [
    {
      type: 'door',
      x: 600,
      y: 720,
      width: 90,
      height: 60,
      targetLevel: 'level1', // exit back outside
    },
  ],
}
