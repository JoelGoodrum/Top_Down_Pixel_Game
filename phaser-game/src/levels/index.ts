import { level1 } from './level1'

export const LEVELS = {
  level1,
} as const

export type LevelKey = keyof typeof LEVELS