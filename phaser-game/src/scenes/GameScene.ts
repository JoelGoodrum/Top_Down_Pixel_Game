import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { PLAYER_ASSETS } from '../entities/playerConfig'
import { ensureColliderTexture } from '../game/ensureColliderTexture'
import { loadAll, loadMissingAndThen } from '../game/assetLoader'
import { LEVELS, type LevelKey } from '../levels'
import type { LevelData } from '../levels/types'
import { bootstrapLevel } from '../systems/levelBootstrap'

export default class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Player
  private level!: LevelData
  private isTransitioning = false

  constructor() {
    super('GameScene')
  }

  init(data: { levelKey?: LevelKey } = {}) {
    this.level = LEVELS[data.levelKey ?? 'level1']
    this.isTransitioning = false
  }

  preload() {
    this.load.on('loaderror', (file: any) => console.error('LOAD ERROR:', file?.key, file?.src))
    ensureColliderTexture(this)
    loadAll(this, PLAYER_ASSETS)
    loadAll(this, this.level.assets)
  }

  create() {
    this.cameras.main.setBackgroundColor(this.level.world.backgroundColor)

    loadMissingAndThen(this, this.level.assets, () => {
      this.cursors = this.input.keyboard.createCursorKeys()

      const { player } = bootstrapLevel({
        scene: this,
        level: this.level,
        cursors: this.cursors,
        isTransitioning: {
          get: () => this.isTransitioning,
          set: (v) => (this.isTransitioning = v),
        },
      })

      this.player = player
    })
  }

  update() {
    this.player?.update()
  }
}
