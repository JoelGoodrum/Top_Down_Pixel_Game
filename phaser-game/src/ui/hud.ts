import type Phaser from 'phaser'
import { PlayerState } from '../entities/PlayerState'

export type Hud = {
  render: () => void
  destroy: () => void
}

export function createHud(scene: Phaser.Scene, playerState: PlayerState): Hud {
  const itemsText = scene.add
    .text(16, 16, '', {
      fontSize: '20px',
      color: '#000',
      backgroundColor: '#ffffff',
    })
    .setPadding(8)
    .setScrollFactor(0)
    .setDepth(1000) // always on top

  function render() {
    const items = playerState.getItems()

    if (items.length === 0) {
      itemsText.setText('Inventory: (empty)')
      return
    }

    itemsText.setText(`Inventory:\n${items.join('\n')}`)
  }

  // initial render
  render()

  return {
    render,
    destroy() {
      itemsText.destroy()
    },
  }
}
