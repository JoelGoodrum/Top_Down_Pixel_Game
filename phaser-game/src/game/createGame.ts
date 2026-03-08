import Phaser from 'phaser'
import GameScene from '../scenes/GameScene'

type CreateGameOptions = {
  isMobile: boolean
}

export const createGame = (parent: string | HTMLElement, _options: CreateGameOptions) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 720,
    height: 720,
    parent,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [GameScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      },
    },
  }

  return new Phaser.Game(config)
}
