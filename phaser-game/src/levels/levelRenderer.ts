// levelRenderer.ts
import type Phaser from 'phaser'
import type { LevelData } from './types'
import { DEPTH } from '../config/constants'

export function renderLevel(scene: Phaser.Scene, level: LevelData) {
  const colliders = scene.physics.add.staticGroup()

  scene.cameras.main.setBackgroundColor(level.world.backgroundColor)
  scene.physics.world.setBounds(0, 0, level.world.width, level.world.height)
  scene.cameras.main.setBounds(0, 0, level.world.width, level.world.height)

  for (const obj of level.images) {
    const img = scene.add.image(obj.x, obj.y, obj.key)
    img.setOrigin(obj.originX ?? 0.5, obj.originY ?? 0.5)
    if (obj.scale !== undefined) img.setScale(obj.scale)
    img.setDepth(DEPTH.BUILDING)

    if (obj.collider) {
      const s = scene.physics.add.staticImage(
        obj.x + obj.collider.offsetX,
        obj.y + obj.collider.offsetY,
        '__collider__'
      )

      // ✅ THIS is the important part:
      // setDisplaySize affects the static body's dimensions after refreshBody()
      s.setDisplaySize(obj.collider.width, obj.collider.height)
      s.refreshBody()

      // Debug visibility (turn off later)
      s.setAlpha(0.25)
      s.setDepth(DEPTH.BUILDING + 1)

      colliders.add(s)
    }
  }

  return { colliders }
}