import Phaser from 'phaser'
import { loadImages } from './loadAssets'

type ImageAsset = { key: string; url: string } // match your existing asset shape

export function loadAll(scene: Phaser.Scene, assets: ImageAsset[]) {
  loadImages(scene.load, assets)
}

export function missingTextures(scene: Phaser.Scene, assets: ImageAsset[]) {
  return assets.filter((a) => !scene.textures.exists(a.key))
}

export function loadMissingAndThen(scene: Phaser.Scene, assets: ImageAsset[], onDone: () => void) {
  const missing = missingTextures(scene, assets)
  if (missing.length === 0) {
    onDone()
    return
  }

  loadImages(scene.load, missing)
  scene.load.once(Phaser.Loader.Events.COMPLETE, onDone)
  scene.load.start()
}
