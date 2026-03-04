import type Phaser from 'phaser'
import type { LevelKey } from '../levels'
import type { Spawn } from '../levels/types'

type DoorObj = Phaser.GameObjects.GameObject & {
  getData?: (key: string) => unknown
}

export function doorTransitions(opts: {
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

      const targetLevel = (doorObj as DoorObj).getData?.('targetLevel') as LevelKey | undefined
      const targetSpawn = (doorObj as DoorObj).getData?.('targetSpawn') as Spawn | undefined

      if (!targetLevel) return

      setIsTransitioning(true)
      scene.scene.start('GameScene', { levelKey: targetLevel, spawn: targetSpawn })
    },
    undefined,
    scene
  )
}
