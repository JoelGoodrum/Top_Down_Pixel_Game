import type Phaser from 'phaser'
import type { DialogController } from '../systems/dialogController'
import { recordGameCompletion } from '../api/gameStats'

type PlayLeverEndingOptions = {
  scene: Phaser.Scene
  lever: Phaser.Physics.Arcade.Image
  player: { stop: () => void; destroy: () => void }
  dialogController?: DialogController
  gameStartTime: number
  onReadyForRestart: () => void
}

export const playLeverEndingSequence = ({
  scene,
  lever,
  player,
  dialogController,
  gameStartTime,
  onReadyForRestart,
}: PlayLeverEndingOptions) => {
  player.stop()

  const leverPosition = { x: lever.x, y: lever.y }
  const leverScale = { x: lever.scaleX, y: lever.scaleY }
  const holdingLever = scene.add
    .image(leverPosition.x, leverPosition.y, 'holding-lever-right')
    .setOrigin(0.5, 1)
    .setScale(leverScale.x, leverScale.y)
    .setDepth(lever.depth)

  player.destroy()
  lever.destroy()

  scene.time.delayedCall(500, () => {
    holdingLever.setTexture('holding-lever-left')

    scene.time.delayedCall(500, () => {
      dialogController?.startDialogLines(
        'dialog:quantumRoom:endingThanks',
        ['Thank you...'],
        true,
        () => {
          const blackScreen = scene.add
            .rectangle(
              scene.scale.width / 2,
              scene.scale.height / 2,
              scene.scale.width,
              scene.scale.height,
              0x000000
            )
            .setScrollFactor(0)
            .setAlpha(0)
            .setDepth(1000)

          scene.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
              const completionDurationMs = Math.max(0, scene.time.now - gameStartTime)
              const completionDurationSeconds = Math.floor(completionDurationMs / 1000)
              const completionTimeText = formatCompletionTime(completionDurationMs)

              void recordGameCompletion(completionDurationSeconds)

              scene.add
                .text(
                  scene.scale.width / 2,
                  scene.scale.height / 2,
                  `Thank you for playing the game!\nTime to beat: ${completionTimeText}\n(press enter to restart)`,
                  {
                    color: '#ffffff',
                    fontSize: '32px',
                    align: 'center',
                  }
                )
                .setOrigin(0.5)
                .setScrollFactor(0)
                .setDepth(blackScreen.depth + 1)

              onReadyForRestart()
            },
          })
        }
      )
    })
  })
}

const formatCompletionTime = (durationMs: number) => {
  const totalSeconds = Math.floor(durationMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (minutes === 0) {
    return `${seconds}s`
  }

  return `${minutes}m ${seconds}s`
}
