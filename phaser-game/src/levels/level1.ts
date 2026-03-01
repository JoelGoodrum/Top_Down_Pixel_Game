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
    { key: 'hotel', path: '/assets/sprites/buildings/hotel.png' },
    { key: 'office', path: '/assets/sprites/buildings/office.png' },
    { key: 'club', path: '/assets/sprites/buildings/club.png' },
    { key: 'stock-trading', path: '/assets/sprites/buildings/stock-trading.png' },
  ],

  images: [
    {
      key: 'club',
      x: 800,
      y: 800,
      scale: SCALE.BUILDING,
      originX: 0.5,
      originY: 1,
      collider: { offsetX: 0, offsetY: -330, width: 450, height: 360 },
    },
    {
      key: 'office',
      x: 1400,
      y: 800,
      scale: SCALE.BUILDING,
      originX: 0.5,
      originY: 1,
      // match lab style: large collider around main building mass
      collider: { offsetX: 0, offsetY: -330, width: 320, height: 360 },
    },
    {
      key: 'hotel',
      x: 1500,
      y: 1450,
      scale: SCALE.BUILDING + 0.2,
      originX: 0.5,
      originY: 1,
      // slightly higher y, keep same footprint (tweak later if club art differs)
      collider: { offsetX: 10, offsetY: -430, width: 480, height: 450 },
    },
    {
      key: 'stock-trading',
      x: 800,
      y: 1500,
      scale: SCALE.BUILDING,
      originX: 0.5,
      originY: 1,
      // round building tends to be wider; bump width a bit
      collider: { offsetX: 0, offsetY: -500, width: 400, height: 420 },
    },
  ],

  interactables: [
    {
      type: 'door',
      x: 100,
      y: 100,
      width: 450,
      height: 360,
      targetLevel: 'officeInterior',
    },
  ],
}
