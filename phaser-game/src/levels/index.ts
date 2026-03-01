import { level1 } from './level1'
import { officeInterior } from './officeInterior'

export const LEVELS = {
  level1,
  officeInterior,
} as const

export type LevelKey = keyof typeof LEVELS
