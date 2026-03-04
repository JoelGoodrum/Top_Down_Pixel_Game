export class PlayerState {
  private items: string[]
  private collectedItemIds: Set<string>

  constructor() {
    this.items = []
    this.collectedItemIds = new Set()
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

  clearItems(): void {
    this.items = []
    this.collectedItemIds.clear()
  }
}
