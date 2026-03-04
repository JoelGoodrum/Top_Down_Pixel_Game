import type Phaser from 'phaser'
import type { Player } from '../entities/Player'
import type { PlayerState } from '../entities/PlayerState'
import type { Hud } from '../ui/hud'
import type { DialogController } from './dialogController'

export function bindNpcInteractions(opts: {
  scene: Phaser.Scene
  player: Player
  npcs: Phaser.Physics.Arcade.StaticGroup
  doors: Phaser.Physics.Arcade.StaticGroup
  playerState: PlayerState
  hud: Hud
  dialogController: DialogController
}) {
  const { scene, player, npcs, doors, playerState, hud, dialogController } = opts

  let lastInteractionAt = 0

  scene.physics.add.overlap(player.gameObject, npcs, (_p, npcObj) => {
    if (dialogController.isActive()) {
      return
    }

    if (scene.time.now - lastInteractionAt < 500) {
      return
    }

    const npc = npcObj as Phaser.Physics.Arcade.Image
    const npcId = npc.getData('npcId') as string | undefined
    const dialog = npc.getData('dialog') as readonly string[] | undefined
    const dialogIfHasItem = npc.getData('dialogIfHasItem') as readonly string[] | undefined
    const requiredItem = npc.getData('requiredItem') as string | undefined
    const consumeRequiredItem = Boolean(npc.getData('consumeRequiredItem'))
    const removeAfterTrade = Boolean(npc.getData('removeAfterTrade'))

    if (!npcId || !dialog || dialog.length === 0) {
      return
    }

    let lines = dialog

    if (requiredItem && playerState.hasItem(requiredItem) && dialogIfHasItem && dialogIfHasItem.length > 0) {
      lines = dialogIfHasItem

      if (consumeRequiredItem) {
        playerState.removeItem(requiredItem)
        hud.render()
      }

      if (removeAfterTrade) {
        playerState.markSecurityGuardMoved()
        npc.destroy()
        ensureTowerDoorExists(scene, doors)
      }
    }

    dialogController.startDialogLines(`dialogSeen:npc:${npcId}`, lines, true)
    lastInteractionAt = scene.time.now
  })
}

function ensureTowerDoorExists(scene: Phaser.Scene, doors: Phaser.Physics.Arcade.StaticGroup) {
  const hasTowerDoor = doors.getChildren().some((child) => {
    const door = child as Phaser.Physics.Arcade.Image
    return door.getData('targetLevel') === 'towerLobby'
  })

  if (hasTowerDoor) {
    return
  }

  const towerDoor = scene.physics.add.staticImage(1150, 700, '__collider__')
  towerDoor.setOrigin(0.5, 1)
  towerDoor.setDisplaySize(100, 50)
  towerDoor.refreshBody()
  towerDoor.setAlpha(0)
  towerDoor.setData('targetLevel', 'towerLobby')
  towerDoor.setData('targetSpawn', { x: 400, y: 600, facing: 'up' })

  doors.add(towerDoor)
}
