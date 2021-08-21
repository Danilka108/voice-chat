import * as jwt from 'jsonwebtoken'
import { Provider } from '@nestjs/common'

export const TOKEN_MANAGER = 'TOKEN_MANAGER'

export const tokenManagerProvider: Provider = {
  provide: TOKEN_MANAGER,
  useValue: jwt,
}

export type TokenManager = typeof jwt
