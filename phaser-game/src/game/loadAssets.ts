import type Phaser from 'phaser'

export type ImageAsset = { key: string; path: string }

export function loadImages(load: Phaser.Loader.LoaderPlugin, assets: readonly ImageAsset[]) {
  for (const a of assets) {
    load.image(a.key, a.path)
  }
}