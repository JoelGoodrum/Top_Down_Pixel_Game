import { PlayerState } from '../entities/PlayerState'
import { resetSeenDialogs } from '../systems/dialogController'

let persistentPlayerState = new PlayerState()

export const getPersistentPlayerState = () => persistentPlayerState

export const resetPersistentPlayerState = () => {
  persistentPlayerState = new PlayerState()
  resetSeenDialogs()
}

export const replacePersistentPlayerState = (nextState: PlayerState) => {
  persistentPlayerState = nextState
}
