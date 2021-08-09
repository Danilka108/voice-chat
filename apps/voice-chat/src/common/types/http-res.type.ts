export type HttpResError = {
  status: 'ERROR'
  message: string
}

export type HttpResOK<D = undefined> = {
  status: 'OK'
  message: string
  data: D
}

export type HttpRes<D = undefined> = HttpResError | HttpResOK<D>
