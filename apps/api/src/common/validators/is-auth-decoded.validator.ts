import { AuthDecoded } from '../interfaces'

export const isAuthDecoded = (data: unknown): data is AuthDecoded => {
  return (
    (data as AuthDecoded)?.userID !== undefined &&
    (data as AuthDecoded)?.tel !== undefined
  )
}
