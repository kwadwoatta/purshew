import { Provider } from '@nestjs/common'

import { drizzle } from 'drizzle-orm/node-postgres'
import { PgClientService } from 'src/pg-client/pg-client.service'
import * as schema from './schema'

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider'

export const drizzleProvider: Provider = {
  provide: DrizzleAsyncProvider,
  inject: [PgClientService],
  useFactory: async ({ pgClient }: PgClientService) => {
    const db = drizzle(pgClient, { schema })
    return db
  },
}
