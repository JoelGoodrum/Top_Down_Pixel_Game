import type Phaser from 'phaser'
import type { Player } from '../entities/Player'
import type { PlayerState } from '../entities/PlayerState'
import type { Hud } from '../ui/hud'

export function bindItemPickups(opts: {
  scene: Phaser.Scene
  player: Player
  items: Phaser.Physics.Arcade.StaticGroup
  playerState: PlayerState
  hud: Hud
}) {
  const { scene, player, items, playerState, hud } = opts

  scene.physics.add.overlap(player.gameObject, items, (_p, itemObj) => {
    const item = itemObj as Phaser.Physics.Arcade.Image
    const name = item.getData('itemName') as string | undefined
    const itemId = item.getData('itemId') as string | undefined
    if (!name || !itemId || playerState.hasCollected(itemId)) return

    playerState.markCollected(itemId)
    playerState.addItem(name)
    item.destroy()
    hud.render()
  })
}
