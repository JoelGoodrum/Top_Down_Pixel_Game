# Top Down Pixel Game (Phaser 3 + TypeScript)

A scalable, data-driven 2D top-down game built with Phaser 3 and TypeScript.

This project is structured to separate **game logic**, **level data**, and **entity behavior**, making it easy to extend with new levels, entities, and systems.

---

## 🚀 Project Overview

This game uses a **data-driven architecture**:

- Levels are defined as **pure data**
- Entities (like Player) contain **behavior logic**
- Scenes orchestrate everything without owning logic

This makes the project:
- Easy to scale
- Easy to debug
- Easy to extend (new levels, enemies, systems)

---

## 📁 Directory Structure
```
src/
	config/
	constants.ts # Shared constants (scale, etc.)

entities/
	Player.ts # Player behavior (movement, facing)
	playerConfig.ts # Player asset definitions

game/
	loadAssets.ts # Generic asset loader helper

levels/
	index.ts # Level registry (LEVELS)
	level1.ts # Level data (world, spawn, assets, layout)
	levelRenderer.ts # Renders level into scene
	types.ts # Level type definitions

scenes/
	GameScene.ts # Main scene (orchestration only)

main.ts # Phaser game config / entry point
```

## 🧠 Architecture Breakdown

### 1. Levels = Data (No Logic)

Defines what exists
No Phaser calls
No rendering logic

Example:

```ts
export const level1 = {
  world: { width: 4000, height: 2000, backgroundColor: 0x2ecc71 },
  spawn: { player: { x: 400, y: 300 } },
  assets: [
    { key: 'lab', path: '/assets/sprites/buildings/lab.png' },
    { key: 'office', path: '/assets/sprites/buildings/office.png' },
  ],
  images: [
    { key: 'lab', x: 800, y: 600 },
    { key: 'office', x: 1400, y: 600 },
  ],
}
```

## 2. Entities = Behavior

- Example: Player.ts
- Movement
- Input handling
- Animation / facing

player.update()

The Player does not know about levels — it just acts.

## 3. Scene = Orchestrator

GameScene.ts is intentionally thin:

- Loads assets
- Creates player
- Renders level
- Updates player

renderLevel(this, this.level)
this.player.update()

👉 Scene does not contain business logic

## 4. Renderer = Visual Layer

levelRenderer.ts

Applies background color

Sets world bounds

Places images

scene.add.image(...)

This keeps rendering separate from data.

## 5. Asset Loading = Generic

loadAssets.ts

loadImages(this.load, assets)

Reusable for:

levels

player

future entities

## 🔄 How the Game Runs
Flow

Game starts → GameScene loads

init() selects level from LEVELS

preload() loads:

level assets

player assets

create():

renders level

creates player

sets up camera

update():

updates player movement

## 🎮 Key Concepts
Data-Driven Design

Levels are just JSON-like objects

Easy to add level2, level3, etc.

Separation of Concerns

Level = data

Player = logic

Scene = orchestration

Type Safety

types.ts ensures all levels follow the same structure

Prevents bugs when scaling

## 📈 Scaling the Project
1. Add More Levels
```
export const LEVELS = {
  level1,
  level2,
}
```

Switch levels:

this.scene.start('GameScene', { levelKey: 'level2' })
## 2. Entity System (Enemies, NPCs)

Add:

entities/
  enemy/
  npc/

Each with:

behavior

config

assets

## 3. Tilemaps (Big Upgrade)

Instead of placing images manually:

Use Phaser Tilemaps

Add collision layers

Use Tiled editor

## 4. Animations (Spritesheets)

Replace directional images with:

this.load.spritesheet(...)

Then:

walking animations

idle animations

## 5. Physics / Collisions

Add:

building collision

player boundaries

interaction zones

## 6. Interaction System (Future Gameplay)

Extend levels:
```
interactables: [
  { type: 'terminal', x: 500, y: 300 }
]
```

Then:

hacking

upgrades

game mechanics

## 7. Camera Improvements

smoothing / lerp

zoom

bounds transitions

## 8. UI Layer

Add:

ui/
  hud/
  menus/
🧹 Code Quality Principles

Small, focused files

No hardcoded level data in scenes

Reusable helpers

Type-safe structures

Clear ownership of logic

🧠 Mental Model
Level → What exists
Player → How things behave
Scene → When things happen
Renderer → How things look
⚡ Getting Started
npm install
npm run dev
🔥 Future Vision

This architecture supports building:

Multiple maps

NPC interactions

Strategy systems

Save/load state

Complex gameplay systems

🙌 Notes

This project is intentionally structured to scale cleanly.

👉 Keep GameScene thin
👉 Keep logic inside entities
👉 Keep data inside levels