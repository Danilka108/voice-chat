import * as jsonwebtoken from 'jsonwebtoken'

export const tokenManagerFactory = () => jsonwebtoken

export type TokenManager = typeof jsonwebtoken

export const TOKEN_MANAGER = 'JWT'
