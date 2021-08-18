import { Injectable } from '@angular/core'

@Injectable()
export class InitProfileService {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
  }

  getToken(): string | null {
    return this.token
  }
}
