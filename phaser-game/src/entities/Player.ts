import Phaser from 'phaser'
import { DEPTH } from '../config/constants'

export type Direction = 'up' | 'down' | 'left' | 'right'

type PlayerConfig = {
  startX: number
  startY: number
  scale: number
  speed?: number
}

const DEFAULT_SPEED = 180

// ✅ NEW: centralized collider config
const PLAYER_COLLIDER = {
  widthRatio: 0.35,
  heightRatio: 0.25,
  offsetXRatio: 0.325,
  offsetYRatio: 0.65,
} as const

export class Player {
  private sprite: Phaser.Physics.Arcade.Sprite
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private lastDirection: Direction = 'down'
  private speed: number

  constructor(
    scene: Phaser.Scene,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    config: PlayerConfig
  ) {
    this.cursors = cursors
    this.speed = config.speed ?? DEFAULT_SPEED

    this.sprite = scene.physics.add.sprite(
      config.startX,
      config.startY,
      'player-down'
    )

    this.sprite.setOrigin(0.5, 1)
    this.sprite.setScale(config.scale)
    this.sprite.setDepth(DEPTH.PLAYER)

    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)

    // ✅ Use constants instead of inline math
    body.setSize(
      this.sprite.width * PLAYER_COLLIDER.widthRatio,
      this.sprite.height * PLAYER_COLLIDER.heightRatio
    )

    body.setOffset(
      this.sprite.width * PLAYER_COLLIDER.offsetXRatio,
      this.sprite.height * PLAYER_COLLIDER.offsetYRatio
    )
  }

  update() {
    this.updateMovement()
    this.updateFacingFromLastKeyPressed()
    this.sprite.setDepth(DEPTH.PLAYER)
  }

  get gameObject() {
    return this.sprite
  }

  private updateMovement() {
    let dx = 0
    let dy = 0

    if (this.cursors.left?.isDown) dx -= 1
    if (this.cursors.right?.isDown) dx += 1
    if (this.cursors.up?.isDown) dy -= 1
    if (this.cursors.down?.isDown) dy += 1

    if (dx === 0 && dy === 0) {
      this.sprite.setVelocity(0, 0)
      return
    }

    const len = Math.sqrt(dx * dx + dy * dy)
    dx /= len
    dy /= len

    this.sprite.setVelocity(dx * this.speed, dy * this.speed)
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
}