import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { SCALE } from '../config/constants'
import type { LevelData } from '../levels/types'
import { renderLevel } from '../levels/levelRenderer'
import { bindAutoEnterDoors } from './doorTransitions'

export function bootstrapLevel(opts: {
  scene: Phaser.Scene
  level: LevelData
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  isTransitioning: { get: () => boolean; set: (v: boolean) => void }
}) {
  const { scene, level, cursors, isTransitioning } = opts

  const { colliders, doors } = renderLevel(scene, level)

  const player = new Player(scene, cursors, {
    startX: level.spawn.player.x,
    startY: level.spawn.player.y,
    scale: SCALE.PLAYER,
  })

  scene.physics.add.collider(player.gameObject, colliders)

  bindAutoEnterDoors({
    scene,
    playerBody: player.gameObject,
    doors,
    getIsTransitioning: isTransitioning.get,
    setIsTransitioning: isTransitioning.set,
  })

  scene.cameras.main.startFollow(player.gameObject)
  scene.cameras.main.setDeadzone(0, 0)

  return { player }
}
