import Phaser from 'phaser'
import { DEPTH, WALK_ANIMATION_FRAME_DURATION_MS } from '../config/constants'
import { getVirtualMovementState } from '../game/mobileControls'

export type Direction = 'up' | 'down' | 'left' | 'right'

type PlayerConfig = {
  startX: number
  startY: number
  scale: number
  speed?: number
  facing?: Direction
  wearingLabcoat?: boolean
}

const DEFAULT_SPEED = 180
const BASE_PLAYER_ORIGIN_X = 0.5
const PLAYER_ORIGIN_Y = 1

// Manual tuning value for left/right-facing sprites to reduce visible head displacement.
// Increase/decrease this value to shift only side-facing frames horizontally.
const SIDE_FACING_ORIGIN_X_OFFSET = 0

const WALK_FRAMES_BY_OUTFIT: Record<'player' | 'labcoat', Record<Direction, readonly string[]>> = {
  player: {
    up: ['player-up-left', 'player-up-right'],
    down: ['player-down-left', 'player-down-right'],
    left: ['player-left-right', 'player-left'],
    right: ['player-right-left', 'player-right'],
  },
  labcoat: {
    up: ['labcoat-up-left', 'labcoat-up-right'],
    down: ['labcoat-down-left', 'labcoat-down-right'],
    left: ['labcoat-left-left', 'labcoat-left'],
    right: ['labcoat-right-right', 'labcoat-right'],
  },
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
  private outfit: 'player' | 'labcoat'
  private isDestroyed = false
  private previousDirectionDownState: Record<Direction, boolean> = {
    up: false,
    down: false,
    left: false,
    right: false,
  }

  constructor(
    scene: Phaser.Scene,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    config: PlayerConfig
  ) {
    this.cursors = cursors
    this.speed = config.speed ?? DEFAULT_SPEED
    this.outfit = config.wearingLabcoat ? 'labcoat' : 'player'

    const initialFacing: Direction = config.facing ?? 'down'
    this.lastDirection = initialFacing

    this.sprite = scene.physics.add.sprite(
      config.startX,
      config.startY,
      this.textureKeyForDirection(initialFacing)
    )

    this.sprite.setOrigin(BASE_PLAYER_ORIGIN_X, PLAYER_ORIGIN_Y)
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
    if (this.isDestroyed) {
      return
    }

    this.updateMovement()
    this.updatePressedDirections()
    this.updateFacingFromPressedKeys()
    this.updateTexture()
    this.sprite.setDepth(DEPTH.PLAYER)
  }

  stop() {
    if (this.isDestroyed) {
      return
    }

    this.sprite.setVelocity(0, 0)
  }

  get gameObject() {
    return this.sprite
  }

  setWearingLabcoat(wearingLabcoat: boolean) {
    if (this.isDestroyed) {
      return
    }

    const nextOutfit = wearingLabcoat ? 'labcoat' : 'player'
    if (this.outfit === nextOutfit) return

    this.outfit = nextOutfit
    this.walkFrameElapsedMs = 0
    this.walkFrameIndex = 0
    this.currentTextureKey = ''
    this.updateTexture()
  }

  destroy() {
    if (this.isDestroyed) {
      return
    }

    this.isDestroyed = true
    this.sprite.destroy()
  }

  private updateMovement() {
    let dx = 0
    let dy = 0
    const virtualMovementState = getVirtualMovementState()

    if (this.cursors.left?.isDown || virtualMovementState.left) dx -= 1
    if (this.cursors.right?.isDown || virtualMovementState.right) dx += 1
    if (this.cursors.up?.isDown || virtualMovementState.up) dy -= 1
    if (this.cursors.down?.isDown || virtualMovementState.down) dy += 1

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
    this.updateDirectionState('left')
    this.updateDirectionState('right')
    this.updateDirectionState('up')
    this.updateDirectionState('down')
  }

  private updateDirectionState(dir: Direction) {
    const directionDown = this.isDirectionDown(dir)
    const wasDirectionDown = this.previousDirectionDownState[dir]

    if (directionDown && !wasDirectionDown) {
      this.pressedDirections = this.pressedDirections.filter((d) => d !== dir)
      this.pressedDirections.push(dir)
    }

    if (!directionDown && wasDirectionDown) {
      this.pressedDirections = this.pressedDirections.filter((d) => d !== dir)
    }

    this.previousDirectionDownState[dir] = directionDown
  }

  private isDirectionDown(dir: Direction): boolean {
    const virtualMovementState = getVirtualMovementState()

    if (dir === 'left') return Boolean(this.cursors.left?.isDown || virtualMovementState.left)
    if (dir === 'right') return Boolean(this.cursors.right?.isDown || virtualMovementState.right)
    if (dir === 'up') return Boolean(this.cursors.up?.isDown || virtualMovementState.up)

    return Boolean(this.cursors.down?.isDown || virtualMovementState.down)
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
      this.setTextureIfChanged(this.textureKeyForDirection(this.lastDirection))
      return
    }

    const deltaMs = this.sprite.scene.game.loop.delta
    this.walkFrameElapsedMs += deltaMs

    if (this.walkFrameElapsedMs >= WALK_ANIMATION_FRAME_DURATION_MS) {
      this.walkFrameElapsedMs -= WALK_ANIMATION_FRAME_DURATION_MS
      this.walkFrameIndex =
        (this.walkFrameIndex + 1) % WALK_FRAMES_BY_OUTFIT[this.outfit][this.lastDirection].length
    }

    const frameTexture = WALK_FRAMES_BY_OUTFIT[this.outfit][this.lastDirection][this.walkFrameIndex]
    this.setTextureIfChanged(frameTexture)
  }

  private textureKeyForDirection(direction: Direction): string {
    return `${this.outfit}-${direction}`
  }

  private setTextureIfChanged(textureKey: string) {
    if (this.currentTextureKey === textureKey) return
    this.currentTextureKey = textureKey
    this.sprite.setTexture(textureKey)
    this.applyDirectionalOriginXOffset()
  }

  private applyDirectionalOriginXOffset() {
    const sideFacing = this.lastDirection === 'left' || this.lastDirection === 'right'
    const originX = sideFacing
      ? BASE_PLAYER_ORIGIN_X + SIDE_FACING_ORIGIN_X_OFFSET
      : BASE_PLAYER_ORIGIN_X

    this.sprite.setOrigin(originX, PLAYER_ORIGIN_Y)
  }
}
