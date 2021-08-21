import { Provider } from '@nestjs/common'

export interface DatabaseConfig {
  type: string
  host: string
  port: string
  username: string
  password: string
  database: string
  synchronize: boolean
}

export const DATABASE_CONFIG = Symbol('Database Config')

export const databaseConfigProvider: Provider<DatabaseConfig> = {
  provide: DATABASE_CONFIG,
  useValue: {
    type: <string>process.env.DB_TYPE,
    host: <string>process.env.DB_HOST,
    port: <string>process.env.DB_PORT,
    username: <string>process.env.DB_USER,
    password: <string>process.env.DB_PASSWORD,
    database: <string>process.env.DB_NAME,
    synchronize: true,
  },
}
