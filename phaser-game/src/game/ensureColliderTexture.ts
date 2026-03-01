import Phaser from 'phaser'

export function ensureColliderTexture(scene: Phaser.Scene, key = '__collider__') {
  if (scene.textures.exists(key)) return

  const g = scene.make.graphics({ x: 0, y: 0, add: false })
  g.fillStyle(0xffffff, 1)
  g.fillRect(0, 0, 1, 1)
  g.generateTexture(key, 1, 1)
  g.destroy()
}
