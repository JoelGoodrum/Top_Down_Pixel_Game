import type { PlayerState } from '../entities/PlayerState'
import type { LevelKey } from './index'
import type { Interactable } from './types'

export function progressionPoints(opts: {
  levelKey: LevelKey
  interactable: Interactable
  playerState: PlayerState
}): boolean {
  const { levelKey, interactable, playerState } = opts

  if (interactable.type === 'door') {
    if (
      levelKey === 'city' &&
      interactable.targetLevel === 'towerLobby' &&
      !playerState.hasMovedSecurityGuard()
    ) {
      return false
    }

    if (
      levelKey === 'loftHall' &&
      interactable.targetLevel === 'room115' &&
      !playerState.hasSeenTowerKeycardHint()
    ) {
      return false
    }

    if (
      levelKey === 'towerHall' &&
      interactable.targetLevel === 'lab' &&
      !playerState.hasItem('clothes')
    ) {
      return false
    }

    if (
      levelKey === 'loftHall' &&
      interactable.targetLevel === 'room101' &&
      !playerState.hasVisitedRoom115()
    ) {
      return false
    }
  }

  if (interactable.type === 'npc') {
    if (interactable.id === 'security-guard' && playerState.hasMovedSecurityGuard()) {
      return false
    }
  }

  return true
}
