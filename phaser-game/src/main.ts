import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT, // Scale to fit window
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center horizontally and vertically
  },
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
}

new Phaser.Game(config)
