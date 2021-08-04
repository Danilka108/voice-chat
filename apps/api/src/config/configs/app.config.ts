import { registerAs } from '@nestjs/config'

import { Injectable } from '@nestjs/common'

export const appConfig = registerAs('app', () => ({
  port: process.env.APP_PORT,
}))
