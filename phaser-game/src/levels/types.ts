export type LevelAsset = {
  key: string
  path: string
}

export type LevelImage = {
  key: string
  x: number
  y: number
  scale?: number
  originX?: number
  originY?: number
}

export type LevelData = {
  world: {
    width: number
    height: number
    backgroundColor: number
  }
  assets: readonly LevelAsset[]
  images: readonly LevelImage[]
  spawn: {
    player: { x: number; y: number }
  }
}