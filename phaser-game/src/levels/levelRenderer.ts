import type Phaser from 'phaser'
import type { LevelData } from './types'

export function renderLevel(scene: Phaser.Scene, level: LevelData) {
  const { world, images } = level

  scene.cameras.main.setBackgroundColor(world.backgroundColor)

  // world/camera bounds
  scene.physics.world.setBounds(0, 0, world.width, world.height)
  scene.cameras.main.setBounds(0, 0, world.width, world.height)

  // place images
  for (const obj of images) {
    const img = scene.add.image(obj.x, obj.y, obj.key)
    img.setOrigin(obj.originX ?? 0.5, obj.originY ?? 0.5)
    if (obj.scale !== undefined) img.setScale(obj.scale)
    img.setDepth(img.y)
  }
}