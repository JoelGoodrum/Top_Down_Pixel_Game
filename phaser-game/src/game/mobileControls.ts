import type { Direction } from '../entities/Player'

export type VirtualMovementState = Record<Direction, boolean>

const movementState: VirtualMovementState = {
  up: false,
  down: false,
  left: false,
  right: false,
}

let enterPressed = false

export const setVirtualMovementState = (nextState: Partial<VirtualMovementState>) => {
  movementState.up = Boolean(nextState.up)
  movementState.down = Boolean(nextState.down)
  movementState.left = Boolean(nextState.left)
  movementState.right = Boolean(nextState.right)
}

export const clearVirtualMovementState = () => {
  setVirtualMovementState({ up: false, down: false, left: false, right: false })
}

export const getVirtualMovementState = (): VirtualMovementState => movementState

export const pressVirtualEnter = () => {
  enterPressed = true
}

export const consumeVirtualEnterPress = () => {
  const wasPressed = enterPressed
  enterPressed = false
  return wasPressed
}

export const isMobileDevice = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.matchMedia('(pointer: coarse)').matches ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  )
}
