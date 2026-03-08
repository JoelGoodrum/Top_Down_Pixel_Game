import type Phaser from 'phaser'
import type { LevelStartingDialog } from '../levels/types'

const runSeenDialogs = new Set<string>()

export const resetSeenDialogs = () => {
  runSeenDialogs.clear()
}

export class DialogController {
  private readonly scene: Phaser.Scene
  private dialogIndex = 0
  private dialogLines: readonly string[] = []
  private dialogBox?: Phaser.GameObjects.Rectangle
  private dialogText?: Phaser.GameObjects.Text
  private dialogHintText?: Phaser.GameObjects.Text
  private onDialogComplete?: () => void

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

  startDialogLines(id: string, lines: readonly string[], repeat = true, onComplete?: () => void) {
    this.startDialog({ id, lines, repeat }, onComplete)
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

  private startDialog(dialog: LevelStartingDialog, onComplete?: () => void) {
    this.onDialogComplete = onComplete
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

    this.dialogHintText = this.scene.add
      .text(cam.width / 2, cam.height - 16, '(press enter)', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 1)
      .setScrollFactor(0)
      .setDepth(1201)
  }

  private destroyDialog() {
    const onComplete = this.onDialogComplete

    this.dialogText?.destroy()
    this.dialogHintText?.destroy()
    this.dialogBox?.destroy()
    this.dialogText = undefined
    this.dialogHintText = undefined
    this.dialogBox = undefined
    this.dialogLines = []
    this.dialogIndex = 0
    this.onDialogComplete = undefined

    onComplete?.()
  }
}
