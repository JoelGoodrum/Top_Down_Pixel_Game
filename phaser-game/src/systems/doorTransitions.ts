import type Phaser from 'phaser'
import type { PlayerState } from '../entities/PlayerState'
import type { LevelKey } from '../levels'
import type { Spawn } from '../levels/types'
import type { DialogController } from './dialogController'

type DoorObj = Phaser.GameObjects.GameObject & {
  getData?: (key: string) => unknown
}

export function doorTransitions(opts: {
  scene: Phaser.Scene
  playerBody: Phaser.GameObjects.GameObject
  doors: Phaser.GameObjects.GameObject | Phaser.GameObjects.Group
  levelKey: LevelKey
  playerState: PlayerState
  dialogController: DialogController
  getIsTransitioning: () => boolean
  setIsTransitioning: (v: boolean) => void
}) {
  const {
    scene,
    levelKey,
    playerBody,
    doors,
    playerState,
    dialogController,
    getIsTransitioning,
    setIsTransitioning,
  } = opts

  let interactionLockDoor:
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Physics.Arcade.Body
    | Phaser.Physics.Arcade.StaticBody
    | undefined

  scene.events.on('update', () => {
    if (!interactionLockDoor || dialogController.isActive()) {
      return
    }

    if (!scene.physics.overlap(playerBody, interactionLockDoor)) {
      interactionLockDoor = undefined
    }
  })

  scene.physics.add.overlap(
    playerBody,
    doors,
    (_player, doorObj) => {
      if (getIsTransitioning()) return
      if (interactionLockDoor === doorObj) return

      const targetLevel = (doorObj as DoorObj).getData?.('targetLevel') as LevelKey | undefined
      const targetSpawn = (doorObj as DoorObj).getData?.('targetSpawn') as Spawn | undefined

      if (!targetLevel) return


      if (
        levelKey === 'towerLobby' &&
        targetLevel === 'towerHall' &&
        !playerState.hasItem('keyCard')
      ) {
        if (!playerState.hasSeenTowerKeycardHint()) {
          playerState.markSeenTowerKeycardHint()
        }

        if (!dialogController.isActive()) {
          dialogController.startDialogLines('dialog:towerLobby:missingKeyCard', [
            'It looks like you need a key card to go up.',
            'I have a friend who lives in apartment 115, he might be able to help.',
            'Hurry!',
          ])

          interactionLockDoor = doorObj as Phaser.Types.Physics.Arcade.GameObjectWithBody
        }

        return
      }

      setIsTransitioning(true)
      scene.scene.start('GameScene', { levelKey: targetLevel, spawn: targetSpawn })
    },
    undefined,
    scene
  )
}
