import type { LevelData } from './types'
import { SCALE } from '../config/constants'

export const level1: LevelData = {
  world: {
    width: 2500,
    height: 1350,
    backgroundColor: 0x2ecc71,
  },

  spawn: {
    player: { x: 1100, y: 790 },
  },

  assets: [
    { key: 'office', path: '/assets/sprites/buildings/office.png' },
    { key: 'exec-tower', path: '/assets/sprites/buildings/exec-tower.png' },
    { key: 'lofts', path: '/assets/sprites/buildings/lofts.png' },
    { key: 'bar', path: '/assets/sprites/buildings/bar.png' },
    { key: 'pharmacy', path: '/assets/sprites/buildings/pharmacy.png' },
    { key: 'park', path: '/assets/sprites/buildings/park.png' },
  ],

  images: [
    {
      key: 'office',
      x: 400,
      y: 800,
      scale: SCALE.BUILDING,
      originX: 0.5,
      originY: 1,
      // match lab style: large collider around main building mass
      collider: { offsetX: 0, offsetY: -330, width: 320, height: 360 },
    },
    {
      key: 'exec-tower',
      x: 1100,
      y: 1450,
      scale: SCALE.BUILDING + 1.2,
      originX: 0.5,
      originY: 1,
      // match lab style: large collider around main building mass
      collider: { offsetX: 0, offsetY: -1100, width: 480, height: 650 },
    },
    {
      key: 'lofts',
      x: 1850,
      y: 1100,
      scale: SCALE.BUILDING + 0.5,
      originX: 0.5,
      originY: 1,
      // slightly higher y, keep same footprint (tweak later if club art differs)
      collider: { offsetX: 0, offsetY: -650, width: 600, height: 380 },
    },
    {
      key: 'bar',
      x: 400,
      y: 1390,
      scale: SCALE.BUILDING + 0.1,
      originX: 0.5,
      originY: 1,
      collider: { offsetX: 0, offsetY: -380, width: 450, height: 300 },
    },

    {
      key: 'park',
      x: 1080,
      y: 1350,
      scale: SCALE.BUILDING,
      originX: 0.5,
      originY: 1,
      // match lab style: large collider around main building mass
      collider: { offsetX: 0, offsetY: -330, width: 200, height: 160 },
    },
    {
      key: 'pharmacy',
      x: 1750,
      y: 1390,
      scale: SCALE.BUILDING + 0.1,
      originX: 0.5,
      originY: 1,
      // round building tends to be wider; bump width a bit
      collider: { offsetX: 0, offsetY: -380, width: 450, height: 300 },
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
