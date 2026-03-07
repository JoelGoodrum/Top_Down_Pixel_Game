export class Progression {
  private securityGuardMoved: boolean
  private visitedRoom115: boolean
  private seenTowerKeycardHint: boolean

  constructor() {
    this.securityGuardMoved = false
    this.visitedRoom115 = false
    this.seenTowerKeycardHint = false
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

  hasSeenTowerKeycardHint(): boolean {
    return this.seenTowerKeycardHint
  }

  markSeenTowerKeycardHint(): void {
    this.seenTowerKeycardHint = true
  }

  reset(): void {
    this.securityGuardMoved = false
    this.visitedRoom115 = false
    this.seenTowerKeycardHint = false
  }
}
