import Phaser from 'phaser'
import GameScene from '../scenes/GameScene'

type CreateGameOptions = {
  isMobile: boolean
}

export const createGame = (parent: string | HTMLElement, options: CreateGameOptions) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: options.isMobile ? 1600 : 800,
    parent,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [GameScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
  }

  return new Phaser.Game(config)
}
