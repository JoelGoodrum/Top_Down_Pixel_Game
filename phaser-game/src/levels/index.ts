import { city } from './city'
import { officeInterior } from './officeInterior'
import { barInterior } from './barInterior'
import { pharmacyInterior } from './pharmacyInterior'
import { loftHall } from './loftHall'
import { room101 } from './room101'
import { room115 } from './room115'
import { towerLobby } from './towerLobby'
import { towerHall } from './towerHall'
import { closet } from './closet'
import { lab } from './lab'
import { quantumRoom } from './quantumRoom'

export const LEVELS = {
  city,
  officeInterior,
  barInterior,
  pharmacyInterior,
  loftHall,
  room101,
  room115,
  towerLobby,
  towerHall,
  closet,
  lab,
  quantumRoom,
} as const

export type LevelKey = keyof typeof LEVELS
