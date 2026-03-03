import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT, // Scale to fit window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center horizontally and vertically
  },
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
}

new Phaser.Game(config)
