import type Phaser from 'phaser'
import type { LevelData } from './types'
import type { LevelKey } from './index'
import type { PlayerState } from '../entities/PlayerState'
import { DEPTH, SCALE } from '../config/constants'
import { progressionPoints } from './progressionPoints'

export function renderLevel(
  scene: Phaser.Scene,
  level: LevelData,
  levelKey: LevelKey,
  playerState: PlayerState
) {
  const colliders = scene.physics.add.staticGroup()
  const doors = scene.physics.add.staticGroup()
  const items = scene.physics.add.staticGroup()
  const npcs = scene.physics.add.staticGroup()
  const interactables = scene.physics.add.staticGroup()

  scene.cameras.main.setBackgroundColor(level.world.backgroundColor)
  scene.physics.world.setBounds(0, 0, level.world.width, level.world.height)
  scene.cameras.main.setBounds(0, 0, level.world.width, level.world.height)

  // --- images + optional building colliders ---
  for (const obj of level.images) {
    const img = scene.add.image(obj.x, obj.y, obj.key)
    img.setOrigin(obj.originX ?? 0.5, obj.originY ?? 0.5)
    if (obj.scale !== undefined) img.setScale(obj.scale)
    img.setDepth(DEPTH.BUILDING)

    if (obj.collider) {
      const s = scene.physics.add.staticImage(
        obj.x + obj.collider.offsetX,
        obj.y + obj.collider.offsetY,
        '__collider__'
      )

      s.setDisplaySize(obj.collider.width, obj.collider.height)
      s.refreshBody()
      s.setAlpha(0)
      s.setDepth(DEPTH.BUILDING + 1)

      colliders.add(s)
    }
  }

  // --- interactables ---
  if (level.interactables) {
    for (const obj of level.interactables) {
      if (!progressionPoints({ levelKey, interactable: obj, playerState })) {
        continue
      }

      if (obj.type === 'door') {
        const s = scene.physics.add.staticImage(obj.x, obj.y, '__collider__')
        s.setOrigin(0.5, 1)
        s.setDisplaySize(obj.width, obj.height)
        s.refreshBody()

        s.setData('targetLevel', obj.targetLevel)
        s.setData('targetSpawn', obj.targetSpawn)

        s.setAlpha(0)
        s.setDepth(DEPTH.DOOR)
        doors.add(s)
      } else if (obj.type === 'item') {
        const itemId = `${levelKey}:${obj.name}:${obj.x}:${obj.y}`
        if (playerState.hasCollected(itemId)) {
          continue
        }

        const it = scene.physics.add.staticImage(obj.x, obj.y, obj.name)
        it.setOrigin(0.5, 1)
        it.setScale(SCALE.ITEMS)
        it.setDepth(DEPTH.BUILDING)
        it.refreshBody()

        it.setData('itemName', obj.name)
        it.setData('itemId', itemId)

        items.add(it)
      } else if (obj.type === 'npc') {
        const npc = scene.physics.add.staticImage(obj.x, obj.y, obj.spriteKey)
        npc.setOrigin(0.5, 1)
        npc.setDisplaySize(obj.width, obj.height)
        npc.setDepth(DEPTH.BUILDING)
        npc.refreshBody()

        npc.setData('npcId', obj.id)
        npc.setData('dialog', obj.dialog)
        npc.setData('dialogIfHasItem', obj.dialogIfHasItem)
        npc.setData('requiredItem', obj.requiredItem)
        npc.setData('consumeRequiredItem', obj.consumeRequiredItem)
        npc.setData('removeAfterTrade', obj.removeAfterTrade)

        npcs.add(npc)
      } else if (obj.type === 'interactable') {
        const interactable = scene.physics.add.staticImage(obj.x, obj.y, obj.spriteKey)
        interactable.setOrigin(0.5, 1)
        if (obj.scale !== undefined) {
          interactable.setScale(obj.scale)
        } else {
          interactable.setDisplaySize(obj.width, obj.height)
        }
        interactable.setDepth(DEPTH.BUILDING)
        interactable.refreshBody()

        interactable.setData('interactableName', obj.name)

        interactables.add(interactable)
      } else if (obj.type === 'collider') {
        const s = scene.physics.add.staticImage(obj.x, obj.y, '__collider__')
        s.setOrigin(0.5, 1)
        s.setDisplaySize(obj.width, obj.height)
        s.refreshBody()
        s.setAlpha(0)
        s.setDepth(DEPTH.BUILDING + 1)

        colliders.add(s)
      }
    }
  }

  return { colliders, doors, items, npcs, interactables }
}
