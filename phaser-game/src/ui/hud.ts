import type Phaser from 'phaser'
import { PlayerState } from '../entities/PlayerState'

export type Hud = {
  render: () => void
  destroy: () => void
}

const HUD_PADDING = 8
const SLOT_SIZE = 36
const SLOT_GAP = 8

export function createHud(scene: Phaser.Scene, playerState: PlayerState): Hud {
  const container = scene.add.container(16, 16).setScrollFactor(0).setDepth(1000)

  const background = scene.add
    .rectangle(0, 0, 220, 56, 0xffffff)
    .setOrigin(0, 0)
    .setStrokeStyle(1, 0x000000)

  const label = scene.add
    .text(HUD_PADDING, HUD_PADDING, 'Inventory', {
      fontSize: '16px',
      color: '#000',
    })
    .setOrigin(0, 0)

  const iconContainer = scene.add.container(0, 0)

  container.add([background, label, iconContainer])

  function render() {
    const items = playerState.getItems()

    iconContainer.removeAll(true)

    if (items.length === 0) {
      container.setVisible(false)
      return
    }

    container.setVisible(true)

    for (const [index, item] of items.entries()) {
      if (!scene.textures.exists(item)) {
        continue
      }

      const x = HUD_PADDING + index * (SLOT_SIZE + SLOT_GAP)
      const y = 28

      const slot = scene.add
        .rectangle(x, y, SLOT_SIZE, SLOT_SIZE, 0xf1f1f1)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0x444444)

      const icon = scene.add
        .image(x + SLOT_SIZE / 2, y + SLOT_SIZE / 2, item)
        .setDisplaySize(SLOT_SIZE - 8, SLOT_SIZE - 8)

      iconContainer.add([slot, icon])
    }

    const width = Math.max(220, HUD_PADDING * 2 + items.length * SLOT_SIZE + Math.max(0, items.length - 1) * SLOT_GAP)
    background.setSize(width, 72)
  }

  render()

  return {
    render,
    destroy() {
      container.destroy(true)
    },
  }
}
