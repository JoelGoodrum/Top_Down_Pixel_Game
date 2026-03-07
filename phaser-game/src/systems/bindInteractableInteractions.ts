import type Phaser from 'phaser'
import type { Player } from '../entities/Player'

export function bindInteractableInteractions(opts: {
  scene: Phaser.Scene
  player: Player
  interactables: Phaser.Physics.Arcade.StaticGroup
  onLeverTriggered: (lever: Phaser.Physics.Arcade.Image) => void
}) {
  const { scene, player, interactables, onLeverTriggered } = opts

  let leverTriggered = false

  scene.physics.add.overlap(player.gameObject, interactables, (_p, interactableObj) => {
    if (leverTriggered) {
      return
    }

    const interactable = interactableObj as Phaser.Physics.Arcade.Image
    const interactableName = interactable.getData('interactableName') as string | undefined

    if (interactableName !== 'lever') {
      return
    }

    leverTriggered = true
    onLeverTriggered(interactable)
  })
}
