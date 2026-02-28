import type { LevelData } from './types'
import { SCALE } from '../config/constants'

export const level1: LevelData = {
  world: {
    width: 10000,
    height: 2000,
    backgroundColor: 0x2ecc71,
  },

  spawn: {
    player: { x: 800, y: 790 },
  },

  assets: [
    { key: 'lab', path: '/assets/sprites/buildings/lab.png' },
    { key: 'office', path: '/assets/sprites/buildings/office.png' },
    { key: 'club', path: '/assets/sprites/buildings/club.png' },
    { key: 'stock-trading', path: '/assets/sprites/buildings/stock-trading.png' },
  ],

  images: [
    { key: 'lab', x: 800, y: 800, scale: SCALE.BUILDING, originX: 0.5, originY: 1 },
    { key: 'office', x: 1400, y: 800, scale: SCALE.BUILDING, originX: 0.5, originY: 1 },
    { key: 'club', x: 2000, y: 850, scale: SCALE.BUILDING, originX: 0.5, originY: 1 },
    { key: 'stock-trading', x: 2600, y: 900, scale: SCALE.BUILDING, originX: 0.5, originY: 1 },
  ],
}