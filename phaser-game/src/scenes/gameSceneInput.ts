import Phaser from 'phaser'
import { consumeVirtualEnterPress } from '../game/mobileControls'

export const wasEnterPressed = (enterKey?: Phaser.Input.Keyboard.Key) => {
  const keyboardEnterPressed = enterKey ? Phaser.Input.Keyboard.JustDown(enterKey) : false
  return keyboardEnterPressed || consumeVirtualEnterPress()
}
