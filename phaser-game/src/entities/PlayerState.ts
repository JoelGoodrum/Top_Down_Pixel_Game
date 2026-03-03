export class PlayerState {
  private money: number
  constructor(initialCash = 200) {
    this.money = initialCash
    this.items = ['banana', 'key']
  }
  getMoney() {
    return this.money
  }
  addItem(item: string) {
    this.items.push(item)
  }
  getItems() {
    return [this.items.join(', ')]
  }
}
