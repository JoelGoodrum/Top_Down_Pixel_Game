import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { SCALE } from '../config/constants'
import type { LevelData, Spawn } from '../levels/types'
import type { LevelKey } from '../levels'
import { renderLevel } from '../levels/levelRenderer'
import { doorTransitions } from './doorTransitions'
import { bindItemPickups } from './bindItemPickups'
import { bindNpcInteractions } from './bindNpcInteractions'
import type { PlayerState } from '../entities/PlayerState'
import type { Hud } from '../ui/hud'
import type { DialogController } from './dialogController'

export function bootstrapLevel(opts: {
  scene: Phaser.Scene
  level: LevelData
  levelKey: LevelKey
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  isTransitioning: { get: () => boolean; set: (v: boolean) => void }
  playerState: PlayerState
  hud: Hud
  dialogController: DialogController
  spawn?: Spawn
}) {
  const { scene, level, levelKey, cursors, isTransitioning, playerState, hud, dialogController, spawn } =
    opts

  const { colliders, doors, items, npcs } = renderLevel(scene, level, levelKey, playerState)

  const start = spawn ??
    level.spawn?.player ?? { x: level.world.width / 2, y: level.world.height / 2 }

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

  if (npcs) {
    bindNpcInteractions({ scene, player, npcs, doors, playerState, hud, dialogController })
  }

  scene.cameras.main.startFollow(player.gameObject)
  scene.cameras.main.setDeadzone(0, 0)

  return { player }
}
