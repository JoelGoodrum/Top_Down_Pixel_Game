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

const STARTUP_DIALOG_STORAGE_KEY = 'dialogSeen:startup'
const ROOM_115_DIALOG_STORAGE_KEY = 'dialogSeen:room115'

const STARTUP_DIALOG_LINES = ['Help! I am stuck in here']
const ROOM_115_DIALOG_LINES = ['I know Lyla, we play online games together']

export default class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Player
  private level!: LevelData
  private isTransitioning = false

  private playerState!: PlayerState
  private hud!: Hud
  private currentLevelKey!: LevelKey
  private enterKey?: Phaser.Input.Keyboard.Key
  private dialogIndex = 0
  private dialogLines: string[] = []
  private dialogBox?: Phaser.GameObjects.Rectangle
  private dialogText?: Phaser.GameObjects.Text

  // Option A: passed in from doorTransitions via scene.start(..., { spawn })
  private spawn?: Spawn

  constructor() {
    super('GameScene')
  }

  init(data: { levelKey?: LevelKey; spawn?: Spawn } = {}) {
    const levelKey = data.levelKey ?? 'officeInterior'
    this.level = LEVELS[levelKey]
    this.currentLevelKey = levelKey
    this.spawn = data.spawn

    this.isTransitioning = false
    this.dialogIndex = 0
    this.dialogLines = []
    this.dialogBox?.destroy()
    this.dialogText?.destroy()
    this.dialogBox = undefined
    this.dialogText = undefined
    this.enterKey = undefined

    // Keeping your behavior as-is:
    // (If you want inventory to persist across level transitions later, we’ll move this out.)
    this.playerState = new PlayerState()
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

      const { player } = bootstrapLevel({
        scene: this,
        level: this.level,
        cursors: this.cursors,
        isTransitioning: {
          get: () => this.isTransitioning,
          set: (v) => (this.isTransitioning = v),
        },
        playerState: this.playerState,
        hud: this.hud,
        spawn: this.spawn,
      })

      this.player = player
      this.spawn = undefined // consume it

      this.enterKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
      this.startPendingDialogForCurrentLevel()
    })
  }

  update() {
    if (this.isDialogActive()) {
      this.player?.stop()

      if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        this.advanceDialog()
      }

      return
    }

    this.player?.update()
  }

  private startPendingDialogForCurrentLevel() {
    if (this.currentLevelKey === 'officeInterior' && !this.isDialogSeen(STARTUP_DIALOG_STORAGE_KEY)) {
      this.startDialog(STARTUP_DIALOG_LINES, STARTUP_DIALOG_STORAGE_KEY)
      return
    }

    if (this.currentLevelKey === 'room115' && !this.isDialogSeen(ROOM_115_DIALOG_STORAGE_KEY)) {
      this.startDialog(ROOM_115_DIALOG_LINES, ROOM_115_DIALOG_STORAGE_KEY)
    }
  }

  private startDialog(lines: string[], seenStorageKey: string) {
    this.dialogLines = lines
    this.dialogIndex = 0
    this.setDialogSeen(seenStorageKey)

    const cam = this.cameras.main
    const height = 220

    this.dialogBox = this.add
      .rectangle(0, cam.height - height, cam.width, height, 0x1d4ed8)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(1200)

    this.dialogText = this.add
      .text(24, cam.height - height + 24, this.dialogLines[this.dialogIndex] ?? '', {
        fontSize: '32px',
        color: '#ffffff',
        wordWrap: { width: cam.width - 48 },
      })
      .setScrollFactor(0)
      .setDepth(1201)
  }

  private advanceDialog() {
    this.dialogIndex += 1

    if (this.dialogIndex >= this.dialogLines.length) {
      this.dialogText?.destroy()
      this.dialogBox?.destroy()
      this.dialogText = undefined
      this.dialogBox = undefined
      this.dialogLines = []
      this.dialogIndex = 0
      return
    }

    this.dialogText?.setText(this.dialogLines[this.dialogIndex] ?? '')
  }

  private isDialogActive() {
    return Boolean(this.dialogBox && this.dialogText)
  }

  private isDialogSeen(storageKey: string) {
    return window.localStorage.getItem(storageKey) === 'true'
  }

  private setDialogSeen(storageKey: string) {
    window.localStorage.setItem(storageKey, 'true')
  }
}
