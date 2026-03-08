import { React, useEffect } from '../react'
import {
  clearVirtualMovementState,
  getVirtualMovementState,
  isMobileDevice,
  pressVirtualEnter,
  setVirtualMovementState,
} from '../game/mobileControls'
import type { Direction } from '../entities/Player'

export const GameSection = () => {
  useEffect(() => {
    if (!isMobileDevice()) {
      clearVirtualMovementState()
      return
    }

    const directionButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('[data-direction]')
    )

    if (directionButtons.length === 0) {
      return
    }

    const pointerMap = new Map<number, Direction>()

    const syncMovementState = () => {
      const activeDirections = new Set(pointerMap.values())
      setVirtualMovementState({
        up: activeDirections.has('up'),
        down: activeDirections.has('down'),
        left: activeDirections.has('left'),
        right: activeDirections.has('right'),
      })
    }

    const setDirectionFromPointer = (
      event: PointerEvent,
      direction: Direction,
      element: HTMLButtonElement
    ) => {
      pointerMap.set(event.pointerId, direction)
      element.setPointerCapture(event.pointerId)
      syncMovementState()
    }

    const clearPointer = (event: PointerEvent) => {
      pointerMap.delete(event.pointerId)
      syncMovementState()
    }

    const removeListeners = directionButtons.map((button) => {
      const direction = button.dataset.direction as Direction

      const onPointerDown = (event: PointerEvent) => {
        event.preventDefault()
        setDirectionFromPointer(event, direction, button)
      }
      const onPointerUp = (event: PointerEvent) => {
        clearPointer(event)
      }
      const onPointerCancel = (event: PointerEvent) => {
        clearPointer(event)
      }
      const onPointerLeave = (event: PointerEvent) => {
        clearPointer(event)
      }

      const onContextMenu = (event: MouseEvent) => {
        event.preventDefault()
      }

      button.addEventListener('pointerdown', onPointerDown)
      button.addEventListener('pointerup', onPointerUp)
      button.addEventListener('pointercancel', onPointerCancel)
      button.addEventListener('pointerleave', onPointerLeave)
      button.addEventListener('contextmenu', onContextMenu)

      return () => {
        button.removeEventListener('pointerdown', onPointerDown)
        button.removeEventListener('pointerup', onPointerUp)
        button.removeEventListener('pointercancel', onPointerCancel)
        button.removeEventListener('pointerleave', onPointerLeave)
        button.removeEventListener('contextmenu', onContextMenu)
      }
    })

    const existingState = getVirtualMovementState()
    setVirtualMovementState(existingState)

    return () => {
      removeListeners.forEach((remove) => remove())
      clearVirtualMovementState()
    }
  }, [])

  const mobile = isMobileDevice()

  return (
    <section
      aria-label="Game section"
      className={`game-section${mobile ? ' game-section-mobile' : ''}`}
    >
      <div id="game-root" />
      {mobile ? (
        <div className="mobile-controls" aria-label="Mobile controls">
          <div className="mobile-dpad" aria-label="Directional controls">
            <button
              type="button"
              className="dpad-button dpad-up"
              aria-label="Move up"
              data-direction="up"
            >
              ▲
            </button>
            <button
              type="button"
              className="dpad-button dpad-left"
              aria-label="Move left"
              data-direction="left"
            >
              ◀
            </button>
            <button
              type="button"
              className="dpad-button dpad-right"
              aria-label="Move right"
              data-direction="right"
            >
              ▶
            </button>
            <button
              type="button"
              className="dpad-button dpad-down"
              aria-label="Move down"
              data-direction="down"
            >
              ▼
            </button>
          </div>
          <button
            type="button"
            className="mobile-enter-button"
            aria-label="Enter"
            onContextMenu={() => false}
            onPointerDown={() => {
              pressVirtualEnter()
            }}
          >
            ENTER
          </button>
        </div>
      ) : null}
    </section>
  )
}
