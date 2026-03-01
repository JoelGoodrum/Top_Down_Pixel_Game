import type Phaser from 'phaser'
import type { LevelData } from './types'
import { DEPTH } from '../config/constants'

export function renderLevel(scene: Phaser.Scene, level: LevelData) {
  const colliders = scene.physics.add.staticGroup()
  const doors = scene.physics.add.staticGroup()

  scene.cameras.main.setBackgroundColor(level.world.backgroundColor)
  scene.physics.world.setBounds(0, 0, level.world.width, level.world.height)
  scene.cameras.main.setBounds(0, 0, level.world.width, level.world.height)

  // --- images + optional building colliders ---
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

      s.setDisplaySize(obj.collider.width, obj.collider.height)
      s.refreshBody()
      s.setAlpha(0) // set to 0.25 temporarily if you want to see hitboxes
      s.setDepth(DEPTH.BUILDING + 1)

      colliders.add(s)
    }
  }

  // --- interactables (doors etc.) ---
  if (level.interactables) {
    for (const obj of level.interactables) {
      if (obj.type === 'door') {
        // Treat obj.x,obj.y as bottom-center (like building images)
        const s = scene.physics.add.staticImage(obj.x, obj.y, '__collider__')
        s.setOrigin(0.5, 1)

        s.setDisplaySize(obj.width, obj.height)
        s.refreshBody()

        // Store data for GameScene overlap handler
        s.setData('targetLevel', obj.targetLevel)

        s.setAlpha(0) // set to 0.25 temporarily if you want to see door zone
        s.setDepth(DEPTH.DOOR)

        doors.add(s)
      }
    }
  }

  return { colliders, doors }
}
