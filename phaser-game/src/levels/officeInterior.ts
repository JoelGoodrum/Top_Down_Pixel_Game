import type { LevelData } from './types'

export const officeInterior: LevelData = {
  world: {
    width: 800,
    height: 800,
    backgroundColor: 0x222222,
  },

  spawn: {
    player: { x: 700, y: 250 },
  },

  assets: [
    { key: 'office-interior', path: '/assets/sprites/interiors/office-interior.png' },
    { key: 'office-lady-npc', path: '/assets/sprites/NPCs/office-lady-npc.png' },
  ],

  images: [{ key: 'office-interior', x: 400, y: 400, scale: 0.7, originX: 0.5, originY: 0.5 }],

  levelStartingDialog: {
    id: 'dialogSeen:startup',
    lines: [
      'You have recieved a text message.',
      'Help! They locked me up in here!',
      'I am at the top of the \nexecutive tower!',
    ],
    repeat: false,
  },

  interactables: [
    {
      type: 'npc',
      id: 'office-lady',
      x: 230,
      y: 250,
      width: 140,
      height: 140,
      spriteKey: 'office-lady-npc',
      dialog: ['that message is concerning, I would look into that if I were you'],
    },
    {
      type: 'collider',
      x: 345,
      y: 430,
      width: 40,
      height: 130,
    },
    {
      type: 'collider',
      x: 300,
      y: 385,
      width: 130,
      height: 40,
    },
    {
      type: 'collider',
      x: 390,
      y: 385,
      width: 130,
      height: 40,
    },
    {
      type: 'collider',
      x: 345,
      y: 340,
      width: 40,
      height: 130,
    },
    {
      type: 'door',
      x: 400,
      y: 800,
      width: 100,
      height: 60,
      targetLevel: 'city', // exit back outside
      targetSpawn: { x: 400, y: 750, facing: 'down' },
    },
  ],
}
