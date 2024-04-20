import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Client } from 'pg'
import * as schema from 'src/drizzle/schemas'

async function main() {
  const client = new Client({
    connectionString: process.env.DB_URL,
  })

  const db = drizzle(client, { schema })

  console.log('1. connecting to client ...')
  await client.connect()
  console.log('2. connected to client ...')

  console.log('3. migration started ...')
  await migrate(db, { migrationsFolder: 'db/migrations' })
  console.log('4. migration ended ...')

  console.log('5. closing connection ...')
  await client.end()
  console.log('6. connection closed ...')

  process.exit(0)
}

main().catch((error) => {
  console.error({ error })
  process.exit(0)
})
