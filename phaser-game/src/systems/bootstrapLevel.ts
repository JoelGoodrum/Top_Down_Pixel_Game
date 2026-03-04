import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { SCALE } from '../config/constants'
import type { LevelData, Spawn } from '../levels/types'
import type { LevelKey } from '../levels'
import { renderLevel } from '../levels/levelRenderer'
import { doorTransitions } from './doorTransitions'
import { bindItemPickups } from './bindItemPickups'
import type { PlayerState } from '../entities/PlayerState'
import type { Hud } from '../ui/hud'

export function bootstrapLevel(opts: {
  scene: Phaser.Scene
  level: LevelData
  levelKey: LevelKey
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  isTransitioning: { get: () => boolean; set: (v: boolean) => void }
  playerState: PlayerState
  hud: Hud
  spawn?: Spawn
}) {
  const { scene, level, levelKey, cursors, isTransitioning, playerState, hud, spawn } = opts

  const { colliders, doors, items } = renderLevel(scene, level, levelKey, playerState)

  const start = spawn ?? level.spawn.player

  const player = new Player(scene, cursors, {
    startX: start.x,
    startY: start.y,
    scale: SCALE.PLAYER,
    facing: spawn?.facing,
  })

  scene.physics.add.collider(player.gameObject, colliders)

  doorTransitions({
    scene,
    playerBody: player.gameObject,
    doors,
    getIsTransitioning: isTransitioning.get,
    setIsTransitioning: isTransitioning.set,
  })

  if (items) {
    bindItemPickups({ scene, player, items, playerState, hud })
  }

  scene.cameras.main.startFollow(player.gameObject)
  scene.cameras.main.setDeadzone(0, 0)

  return { player }
}
