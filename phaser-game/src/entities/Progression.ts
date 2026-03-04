export class Progression {
  private securityGuardMoved: boolean
  private visitedRoom115: boolean

  constructor() {
    this.securityGuardMoved = false
    this.visitedRoom115 = false
  }

  hasMovedSecurityGuard(): boolean {
    return this.securityGuardMoved
  }

  markSecurityGuardMoved(): void {
    this.securityGuardMoved = true
  }

  hasVisitedRoom115(): boolean {
    return this.visitedRoom115
  }

  markVisitedRoom115(): void {
    this.visitedRoom115 = true
  }

  reset(): void {
    this.securityGuardMoved = false
    this.visitedRoom115 = false
  }
}
