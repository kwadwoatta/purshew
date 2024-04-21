import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { DrizzleAsyncProvider } from './drizzle.provider'
import * as schema from './schema'

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async migrate() {
    await migrate(this.db, { migrationsFolder: 'db/migrations' })
  }

  // async cleanDB() {
  //   this.db.transaction(async (tx) => {
  //     await tx.delete(schema.users);
  //     await tx.delete(schema.documents);
  //     await tx.delete(schema.notebooks);
  //   });
  // }
}
