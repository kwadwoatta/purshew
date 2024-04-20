import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from 'src/drizzle/schemas'
import {
  transactionTemplates,
  transactionTemplatesData,
} from 'src/drizzle/schemas'

async function main() {
  const client = new Client({ connectionString: process.env.DB_URL })

  try {
    await client.connect()

    const db = drizzle(client, { schema })

    let txTemplate: keyof typeof transactionTemplatesData
    for (txTemplate in transactionTemplatesData) {
      const data = transactionTemplatesData[txTemplate]

      await db.insert(transactionTemplates).values({
        type: txTemplate,
        description: data.description,
        balancingTransaction: data.balancing_transaction,
        debitAccountName: data.debit_account,
        creditAccountName: data.credit_account,
        debitAccountAccountType: (schema[data.debit_account] as any).accountType
          .default,
        creditAccountAccountType: (schema[data.credit_account] as any)
          .accountType.default,
      })
    }
    // await db.transaction(async (tx) => {
    //   let txTemplate: keyof typeof transactionTemplatesData
    //   for (txTemplate in transactionTemplatesData) {
    //     const data = transactionTemplatesData[txTemplate]

    //     tx.insert(transactionTemplates).values({
    //       type: txTemplate,
    //       description: data.description,
    //       balancingTransaction: data.balancing_transaction,
    //       debitAccountName: data.debit_account,
    //       creditAccountName: data.credit_account,
    //       debitAccountAccountType: (schema[data.debit_account] as any)
    //         .accountType.default,
    //       creditAccountAccountType: (schema[data.credit_account] as any)
    //         .accountType.default,
    //     })
    //   }
    // })

    await client.end()
    process.exit(0)
  } catch (error) {
    console.error({ error })
    await client.end()
    process.exit(0)
  }
}

main()
