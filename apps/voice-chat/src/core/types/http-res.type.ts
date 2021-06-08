export type HttpResError = {
  status: 'ERROR'
  message: string
}

export type HttpResOK<D> = {
  status: 'OK'
  data: D
}

export type HttpRes<D> = HttpResError | HttpResOK<D>
