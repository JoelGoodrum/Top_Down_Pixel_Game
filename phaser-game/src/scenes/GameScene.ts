import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { PLAYER_ASSETS } from '../entities/playerConfig'
import { SCALE } from '../config/constants'
import { loadImages } from '../game/loadAssets'
import { LEVELS, type LevelKey } from '../levels'
import type { LevelData } from '../levels/types'
import { renderLevel } from '../levels/levelRenderer'

export default class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Player
  private level!: LevelData

  constructor() {
    super('GameScene')
  }

  init(data: { levelKey?: LevelKey } = {}) {
    const key = data.levelKey ?? 'level1'
    this.level = LEVELS[key]
  }

  preload() {
    this.load.on('loaderror', (file: any) => {
      console.error('LOAD ERROR:', file?.key, file?.src)
    })

    loadImages(this.load, this.level.assets)
    loadImages(this.load, PLAYER_ASSETS)
  }

  create() {
    renderLevel(this, this.level)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.player = new Player(this, this.cursors, {
      startX: this.level.spawn.player.x,
      startY: this.level.spawn.player.y,
      scale: SCALE.PLAYER,
    })

    this.cameras.main.startFollow(this.player.gameObject)
    this.cameras.main.setDeadzone(0, 0)
  }

  update() {
    if (!this.player) return
    this.player.update()
  }
}