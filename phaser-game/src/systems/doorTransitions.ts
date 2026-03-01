import Phaser from 'phaser'
import type { LevelKey } from '../levels'

type DoorObj = Phaser.GameObjects.GameObject & {
  getData?: (key: string) => unknown
}

export function bindAutoEnterDoors(opts: {
  scene: Phaser.Scene
  playerBody: Phaser.GameObjects.GameObject
  doors: Phaser.GameObjects.GameObject | Phaser.GameObjects.Group
  getIsTransitioning: () => boolean
  setIsTransitioning: (v: boolean) => void
}) {
  const { scene, playerBody, doors, getIsTransitioning, setIsTransitioning } = opts

  scene.physics.add.overlap(
    playerBody,
    doors,
    (_player, doorObj) => {
      if (getIsTransitioning()) return

      const target = (doorObj as DoorObj).getData?.('targetLevel') as LevelKey | undefined
      if (!target) return

      setIsTransitioning(true)
      scene.scene.start('GameScene', { levelKey: target })
    },
    undefined,
    scene
  )
}
