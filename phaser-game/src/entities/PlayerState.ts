export class PlayerState {
  private items: string[]

  constructor() {
    this.items = []
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

  getItems(): string[] {
    return [...this.items] // return copy
  }

  clearItems(): void {
    this.items = []
  }
}
