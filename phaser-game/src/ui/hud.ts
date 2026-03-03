import type Phaser from 'phaser'
import type { PlayerState } from '../entities/PlayerState'
import { DEPTH } from '../config/constants'

export type Hud = {
  sync: () => void
}
export function createHud(scene: Phaser.Scene, playerState: PlayerState): Hud {
  const cashText = scene.add
    .text(12, 12, '', { fontSize: '32px', fill: '#000' })
    .setScrollFactor(0)
    .setDepth(DEPTH.UI)
  const itemsText = scene.add
    .text(12, 44, '', { fontSize: '32px', fill: '#000' })
    .setScrollFactor(0)
    .setDepth(DEPTH.UI)
  const sync = () => {
    cashText.setText(`Cash: $${playerState.getMoney()}`)
    itemsText.setText(`Items: ${playerState.getItems()}`)
  }

  sync()

  return {
    sync,
  }
}
