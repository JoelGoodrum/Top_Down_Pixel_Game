import { Progression } from './Progression'

export class PlayerState {
  private items: string[]
  private collectedItemIds: Set<string>
  private progression: Progression

  constructor() {
    this.items = []
    this.collectedItemIds = new Set()
    this.progression = new Progression()
  }

  addItem(item: string): void {
    if (!this.items.includes(item)) {
      this.items.push(item)
    }
  }

  removeItem(item: string): void {
    this.items = this.items.filter((i) => i !== item)
  }

  hasItem(item: string): boolean {
    return this.items.includes(item)
  }

  hasCollected(itemId: string): boolean {
    return this.collectedItemIds.has(itemId)
  }

  markCollected(itemId: string): void {
    this.collectedItemIds.add(itemId)
  }

  getItems(): string[] {
    return [...this.items] // return copy
  }

  hasMovedSecurityGuard(): boolean {
    return this.progression.hasMovedSecurityGuard()
  }

  markSecurityGuardMoved(): void {
    this.progression.markSecurityGuardMoved()
  }

  hasVisitedRoom115(): boolean {
    return this.progression.hasVisitedRoom115()
  }

  markVisitedRoom115(): void {
    this.progression.markVisitedRoom115()
  }

  clearItems(): void {
    this.items = []
    this.collectedItemIds.clear()
    this.progression.reset()
  }
}
