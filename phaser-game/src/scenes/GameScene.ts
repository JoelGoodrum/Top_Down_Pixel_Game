import Phaser from 'phaser'
import { Player } from '../entities/Player'
import { PLAYER_ASSETS } from '../entities/playerConfig'
import { ensureColliderTexture } from '../game/ensureColliderTexture'
import { loadAll, loadMissingAndThen } from '../game/assetLoader'
import { LEVELS, type LevelKey } from '../levels'
import type { LevelData, Spawn } from '../levels/types'
import { bootstrapLevel } from '../systems/bootstrapLevel'
import { createHud, type Hud } from '../ui/hud'
import { PlayerState } from '../entities/PlayerState'
import { DialogController } from '../systems/dialogController'

export default class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Player
  private level!: LevelData
  private isTransitioning = false

  private playerState!: PlayerState
  private hud!: Hud
  private levelKey!: LevelKey
  private enterKey?: Phaser.Input.Keyboard.Key
  private dialogController?: DialogController

  // Option A: passed in from doorTransitions via scene.start(..., { spawn })
  private spawn?: Spawn

  constructor() {
    super('GameScene')
  }

  init(data: { levelKey?: LevelKey; spawn?: Spawn } = {}) {
    this.levelKey = data.levelKey ?? 'officeInterior'
    this.level = LEVELS[this.levelKey]
    this.spawn = data.spawn

    this.isTransitioning = false
    this.enterKey = undefined
    this.dialogController?.destroy()

    this.playerState = persistentPlayerState

    if (this.levelKey === 'room115') {
      this.playerState.markVisitedRoom115()
    }
  }

  preload() {
    this.load.on('loaderror', (file: any) => console.error('LOAD ERROR:', file?.key, file?.src))

    ensureColliderTexture(this)
    loadAll(this, PLAYER_ASSETS)
    loadAll(this, this.level.assets)
  }

  create() {
    const cam = this.cameras.main
    cam.setBackgroundColor(this.level.world.backgroundColor)

    loadMissingAndThen(this, this.level.assets, () => {
      this.cursors = this.input.keyboard!.createCursorKeys()

      // HUD first so bootstrap systems can use it
      this.hud = createHud(this, this.playerState)
      this.dialogController = new DialogController(this)

      const { player } = bootstrapLevel({
        scene: this,
        level: this.level,
        levelKey: this.levelKey,
        cursors: this.cursors,
        isTransitioning: {
          get: () => this.isTransitioning,
          set: (v) => (this.isTransitioning = v),
        },
        playerState: this.playerState,
        hud: this.hud,
        dialogController: this.dialogController,
        spawn: this.spawn,
      })

      this.player = player
      this.spawn = undefined // consume it

      this.enterKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
      this.dialogController.startLevelDialog(this.level.levelStartingDialog)
    })
  }

  update() {
    if (this.dialogController?.isActive()) {
      this.player?.stop()

      if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        this.dialogController.advanceDialog()
      }

      return
    }

    this.player?.update()
  }
}

const persistentPlayerState = new PlayerState()
