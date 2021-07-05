export type HttpResError = {
  status: 'ERROR'
  statusCode: number | null
  message: string
}

export type HttpResOK<D> = {
  status: 'OK'
  statusCode: number
  data: D
}

export type HttpRes<D> = HttpResError | HttpResOK<D>
