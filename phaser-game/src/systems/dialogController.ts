import type Phaser from 'phaser'
import type { LevelStartingDialog } from '../levels/types'

const runSeenDialogs = new Set<string>()

export class DialogController {
  private readonly scene: Phaser.Scene
  private dialogIndex = 0
  private dialogLines: readonly string[] = []
  private dialogBox?: Phaser.GameObjects.Rectangle
  private dialogText?: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  startLevelDialog(dialog?: LevelStartingDialog) {
    if (!dialog) {
      return
    }

    if (!dialog.repeat && runSeenDialogs.has(dialog.id)) {
      return
    }

    this.startDialog(dialog)
  }

  advanceDialog() {
    this.dialogIndex += 1

    if (this.dialogIndex >= this.dialogLines.length) {
      this.destroyDialog()
      return
    }

    this.dialogText?.setText(this.dialogLines[this.dialogIndex] ?? '')
  }

  isActive() {
    return Boolean(this.dialogBox && this.dialogText)
  }

  destroy() {
    this.destroyDialog()
  }

  private startDialog(dialog: LevelStartingDialog) {
    this.dialogLines = dialog.lines
    this.dialogIndex = 0
    if (!dialog.repeat) {
      runSeenDialogs.add(dialog.id)
    }

    const cam = this.scene.cameras.main
    const height = 220

    this.dialogBox = this.scene.add
      .rectangle(0, cam.height - height, cam.width, height, 0x1d4ed8)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(1200)

    this.dialogText = this.scene.add
      .text(24, cam.height - height + 24, this.dialogLines[this.dialogIndex] ?? '', {
        fontSize: '32px',
        color: '#ffffff',
        wordWrap: { width: cam.width - 48 },
      })
      .setScrollFactor(0)
      .setDepth(1201)
  }

  private destroyDialog() {
    this.dialogText?.destroy()
    this.dialogBox?.destroy()
    this.dialogText = undefined
    this.dialogBox = undefined
    this.dialogLines = []
    this.dialogIndex = 0
  }
}
