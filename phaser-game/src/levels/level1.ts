import type { LevelData } from './types'
import { SCALE } from '../config/constants'

export const level1: LevelData = {
  world: {
    width: 4000,
    height: 2000,
    backgroundColor: 0x2ecc71,
  },

  spawn: {
    player: { x: 400, y: 300 },
  },

  assets: [
    { key: 'lab', path: '/assets/sprites/buildings/lab.png' },
    { key: 'office', path: '/assets/sprites/buildings/office.png' },
  ],

  images: [
    { key: 'lab', x: 800, y: 600, scale: SCALE.BUILDING, originX: 0.5, originY: 1 },
    { key: 'office', x: 1400, y: 600, scale: SCALE.BUILDING, originX: 0.5, originY: 1 },
  ],
}