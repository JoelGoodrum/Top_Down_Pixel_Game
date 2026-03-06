import Phaser from 'phaser'
import { DEPTH, WALK_ANIMATION_FRAME_DURATION_MS } from '../config/constants'

export type Direction = 'up' | 'down' | 'left' | 'right'

type PlayerConfig = {
  startX: number
  startY: number
  scale: number
  speed?: number
  facing?: Direction
}

const DEFAULT_SPEED = 180

const WALK_FRAMES: Record<Direction, readonly string[]> = {
  up: ['player-up-left', 'player-up-right'],
  down: ['player-down-left', 'player-down-right'],
  left: ['player-left-right', 'player-left'],
  right: ['player-right-left', 'player-right'],
} as const

// Centralized collider config
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
  private pressedDirections: Direction[] = []
  private isMoving = false
  private walkFrameElapsedMs = 0
  private walkFrameIndex = 0
  private currentTextureKey = ''
  private speed: number

  constructor(
    scene: Phaser.Scene,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    config: PlayerConfig
  ) {
    this.cursors = cursors
    this.speed = config.speed ?? DEFAULT_SPEED

    const initialFacing: Direction = config.facing ?? 'down'
    this.lastDirection = initialFacing

    this.sprite = scene.physics.add.sprite(config.startX, config.startY, `player-${initialFacing}`)

    this.sprite.setOrigin(0.5, 1)
    this.sprite.setScale(config.scale)
    this.sprite.setDepth(DEPTH.PLAYER)

    const body = this.sprite.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)

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
    this.updatePressedDirections()
    this.updateFacingFromPressedKeys()
    this.updateTexture()
    this.sprite.setDepth(DEPTH.PLAYER)
  }

  stop() {
    this.sprite.setVelocity(0, 0)
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
      this.isMoving = false
      this.sprite.setVelocity(0, 0)
      return
    }

    this.isMoving = true

    const len = Math.sqrt(dx * dx + dy * dy)
    dx /= len
    dy /= len

    this.sprite.setVelocity(dx * this.speed, dy * this.speed)
  }

  private updatePressedDirections() {
    this.updateDirectionState('left', this.cursors.left)
    this.updateDirectionState('right', this.cursors.right)
    this.updateDirectionState('up', this.cursors.up)
    this.updateDirectionState('down', this.cursors.down)
  }

  private updateDirectionState(dir: Direction, key?: Phaser.Input.Keyboard.Key) {
    if (!key) return

    if (Phaser.Input.Keyboard.JustDown(key)) {
      this.pressedDirections = this.pressedDirections.filter((d) => d !== dir)
      this.pressedDirections.push(dir)
      return
    }

    if (Phaser.Input.Keyboard.JustUp(key)) {
      this.pressedDirections = this.pressedDirections.filter((d) => d !== dir)
    }
  }

  private updateFacingFromPressedKeys() {
    const newestDirectionStillDown = this.pressedDirections[this.pressedDirections.length - 1]
    if (!newestDirectionStillDown) return
    this.lastDirection = newestDirectionStillDown
  }

  private updateTexture() {
    if (!this.isMoving) {
      this.walkFrameElapsedMs = 0
      this.walkFrameIndex = 0
      this.setTextureIfChanged(`player-${this.lastDirection}`)
      return
    }

    const deltaMs = this.sprite.scene.game.loop.delta
    this.walkFrameElapsedMs += deltaMs

    if (this.walkFrameElapsedMs >= WALK_ANIMATION_FRAME_DURATION_MS) {
      this.walkFrameElapsedMs -= WALK_ANIMATION_FRAME_DURATION_MS
      this.walkFrameIndex = (this.walkFrameIndex + 1) % WALK_FRAMES[this.lastDirection].length
    }

    const frameTexture = WALK_FRAMES[this.lastDirection][this.walkFrameIndex]
    this.setTextureIfChanged(frameTexture)
  }

  private setTextureIfChanged(textureKey: string) {
    if (this.currentTextureKey === textureKey) return
    this.currentTextureKey = textureKey
    this.sprite.setTexture(textureKey)
  }
}
