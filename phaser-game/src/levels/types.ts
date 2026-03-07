import type { LevelKey } from './index' // or '../levels' depending on your exports

export type Spawn = {
  x: number
  y: number
  facing?: 'up' | 'down' | 'left' | 'right'
}
export type LevelAsset = {
  key: string
  path: string
}

export type ColliderBox = {
  offsetX: number
  offsetY: number
  width: number
  height: number
}

export type LevelImage = {
  key: string
  x: number
  y: number
  scale?: number
  originX?: number
  originY?: number
  collider?: ColliderBox
}

export type InteractableBase = {
  x: number
  y: number
  width: number
  height: number
}

export type LevelStartingDialog = {
  id: string
  lines: readonly string[]
  repeat?: boolean
}

export type Interactable =
  | (InteractableBase & {
      type: 'door'
      targetLevel: LevelKey
      targetSpawn: Spawn
    })
  | (InteractableBase & {
      type: 'npc'
      id: string
      spriteKey: string
      dialog: readonly string[]
      dialogIfHasItem?: readonly string[]
      requiredItem?: string
      consumeRequiredItem?: boolean
      removeAfterTrade?: boolean
    })
  | (InteractableBase & {
      type: 'item'
      name: string
    })
  | (InteractableBase & {
      type: 'interactable'
      name: 'lever'
      spriteKey: string
      scale?: number
    })

export type LevelData = {
  world: {
    width: number
    height: number
    backgroundColor: number
  }
  assets: readonly LevelAsset[]
  images: readonly LevelImage[]
  spawn?: {
    player: { x: number; y: number }
  }
  interactables?: readonly Interactable[] // ✅ lowercase
  levelStartingDialog?: LevelStartingDialog
}
