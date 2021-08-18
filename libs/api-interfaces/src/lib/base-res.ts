export interface BaseRes<T = undefined> {
  statusCode: number
  message: string
  data: T
}
