import Phaser from 'phaser'

export type Direction = 'up' | 'down' | 'left' | 'right'
type PlayerConfig = {
  startX: number
  startY: number
  scale: number
  speed: number
}

const DEFAULT_SPEED = 3

export class Player {
  private sprite: Phaser.GameObjects.Image
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private lastDirection: Direction = 'down'
  private speed: number

  private updateMovement() {
    let dx = 0
    let dy = 0

    if (this.cursors.left?.isDown) dx -= 1
    if (this.cursors.right?.isDown) dx += 1
    if (this.cursors.up?.isDown) dy -= 1
    if (this.cursors.down?.isDown) dy += 1

    if (dx === 0 && dy === 0) return

    const len = Math.sqrt(dx * dx + dy * dy)
    dx /= len
    dy /= len

    this.sprite.x += dx * this.speed
    this.sprite.y += dy * this.speed
  }

  private updateFacingFromLastKeyPressed() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.setFacing('left')
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.setFacing('right')
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.setFacing('up')
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.setFacing('down')
  }

  private setFacing(dir: Direction) {
    if (this.lastDirection === dir) return
    this.lastDirection = dir
    this.sprite.setTexture(`player-${dir}`)
  }

  constructor(
    scene: Phaser.Scene,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    config: { startX: number; startY: number; scale: number; speed?: number }
  ) {
    this.cursors = cursors
    this.speed = config.speed ?? DEFAULT_SPEED
    this.sprite = scene.add.image(config.startX, config.startY, 'player-down')
    this.sprite.setOrigin(0.5, 1)
    this.sprite.setScale(config.scale)
    this.sprite.setDepth(this.sprite.y)
  }

  /** Call from scene.update() */
  update() {
    this.updateMovement()
    this.updateFacingFromLastKeyPressed()
    this.sprite.setDepth(this.sprite.y)
  }

  /** Expose the underlying image for camera follow, collisions later, etc. */
  get gameObject() {
    return this.sprite
  }

}