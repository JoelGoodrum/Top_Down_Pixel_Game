import type Phaser from 'phaser'

export type ImageAsset = { key: string; path: string }

function resolveAssetPath(path: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(path)) {
    return path
  }

  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`
  }

  return path
}

export function loadImages(load: Phaser.Loader.LoaderPlugin, assets: readonly ImageAsset[]) {
  for (const a of assets) {
    load.image(a.key, resolveAssetPath(a.path))
  }
}
