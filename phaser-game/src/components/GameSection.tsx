import { React, useEffect } from '../react'
import {
  clearVirtualMovementState,
  isMobileDevice,
  pressVirtualEnter,
  setVirtualMovementState,
} from '../game/mobileControls'

const JOYSTICK_THRESHOLD = 24

export const GameSection = () => {
  useEffect(() => {
    if (!isMobileDevice()) {
      clearVirtualMovementState()
      return
    }

    const joystickElement = document.getElementById('mobile-joystick') as HTMLButtonElement | null
    if (!joystickElement) {
      return
    }

    let activePointerId: number | null = null

    const updateFromPointer = (event: PointerEvent) => {
      const rect = joystickElement.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = event.clientX - centerX
      const dy = event.clientY - centerY

      setVirtualMovementState({
        left: dx < -JOYSTICK_THRESHOLD,
        right: dx > JOYSTICK_THRESHOLD,
        up: dy < -JOYSTICK_THRESHOLD,
        down: dy > JOYSTICK_THRESHOLD,
      })
    }

    const handlePointerDown = (event: PointerEvent) => {
      activePointerId = event.pointerId
      joystickElement.setPointerCapture(event.pointerId)
      updateFromPointer(event)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) {
        return
      }

      updateFromPointer(event)
    }

    const resetJoystick = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) {
        return
      }

      activePointerId = null
      clearVirtualMovementState()
    }

    joystickElement.addEventListener('pointerdown', handlePointerDown)
    joystickElement.addEventListener('pointermove', handlePointerMove)
    joystickElement.addEventListener('pointerup', resetJoystick)
    joystickElement.addEventListener('pointercancel', resetJoystick)

    return () => {
      joystickElement.removeEventListener('pointerdown', handlePointerDown)
      joystickElement.removeEventListener('pointermove', handlePointerMove)
      joystickElement.removeEventListener('pointerup', resetJoystick)
      joystickElement.removeEventListener('pointercancel', resetJoystick)
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
          <button
            id="mobile-joystick"
            type="button"
            className="mobile-joystick"
            aria-label="Virtual joystick"
          >
            joystick
          </button>
          <button
            type="button"
            className="mobile-enter-button"
            aria-label="Enter"
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
