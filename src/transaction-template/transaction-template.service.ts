import { Injectable, NotFoundException } from '@nestjs/common'
import { ExtractTablesWithRelations, and, eq, sql } from 'drizzle-orm'
import { Account } from 'src/account/models/account.model'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import {
  accounts,
  transactionTemplates,
  transactions,
} from 'src/drizzle/schemas'
import * as accountsSchema from 'src/drizzle/schemas/accounts/account-types'
import { TransactionTemplate } from './models/transaction-template.model'

@Injectable()
export class TransactionTemplateService {
  constructor(private readonly drizzle: DrizzleService) {}

  async execute(
    amount: number,
    txTemplate: TransactionTemplate,
    userId: string,
    userAccounts: Account[],
  ) {
    const { description } = txTemplate

    type AccountTypeAccountKey = keyof ExtractTablesWithRelations<
      typeof accountsSchema
    >

    const creditAccountName: AccountTypeAccountKey =
      txTemplate.creditAccountName as any
    const debitAccountName: AccountTypeAccountKey =
      txTemplate.debitAccountName as any

    const debitAccountTable = accountsSchema[debitAccountName]
    const creditAccountTable = accountsSchema[creditAccountName]

    const accountIdForDebit = userAccounts.find(
      (a) => a.type === debitAccountTable.accountType.default,
    ).id
    const accountIdForCredit = userAccounts.find(
      (a) => a.type === creditAccountTable.accountType.default,
    ).id

    let join: JSON

    await this.drizzle.db.transaction(async (tx) => {
      const debitAccountId = (
        await tx
          .insert(debitAccountTable)
          .values({
            ownerId: userId,
            amount: String(amount),
            accountId: accountIdForDebit,
          })
          .returning()
      )[0].id

      const creditAccountId = (
        await tx
          .insert(creditAccountTable)
          .values({
            ownerId: userId,
            amount: String(amount),
            accountId: accountIdForCredit,
          })
          .returning()
      )[0].id

      const completedTransaction = (
        await tx
          .insert(transactions)
          .values({
            description,
            ownerId: userId,

            debitAccountId,
            creditAccountId,

            debitAccountAccountId: accountIdForDebit,
            creditAccountAccountId: accountIdForCredit,

            debitAccountName,
            creditAccountName,

            amount: String(amount),
            debitAmount: String(amount),
            creditAmount: String(amount),
          })
          .returning()
      )[0]

      // update balance of debit account (asset, liability, equity, revenue)
      await tx
        .update(accounts)
        .set({
          balance: sql`${accounts.balance} + ${String(amount)}`,
        })
        .where(
          and(eq(accounts.ownerId, userId), eq(accounts.id, accountIdForDebit)),
        )

      // update balance of credit account (asset, liability, equity, revenue)
      await tx
        .update(accounts)
        .set({
          balance: sql`${accounts.balance} - ${String(amount)}`,
        })
        .where(
          and(
            eq(accounts.ownerId, userId),
            eq(accounts.id, accountIdForCredit),
          ),
        )

      const j = await tx
        .select()
        .from(transactions)
        .where(eq(transactions.id, completedTransaction.id))
        .fullJoin(
          debitAccountTable,
          eq(debitAccountTable.id, transactions.debitAccountId),
        )
        .fullJoin(
          creditAccountTable,
          eq(creditAccountTable.id, transactions.creditAccountId),
        )

      join = JSON.parse(JSON.stringify(j))
    })

    return join
  }

  findAll() {
    return this.drizzle.db.select().from(transactionTemplates)
  }

  async findOne(transactionTemplateId: string) {
    const accountReceivable = (
      await this.drizzle.db
        .select()
        .from(transactionTemplates)
        .where(and(eq(transactionTemplates.id, transactionTemplateId)))
    )[0]

    if (!accountReceivable) {
      throw new NotFoundException()
    }

    return accountReceivable
  }
}

// switch (debitAccountName) {
//   case 'accounts' as const:
//     schema[debitAccountName].$inferInsert
//     break
//   case 'cash':
//   case 'inventory':
//   case 'property':
//   case 'equipment':
//   case 'accountsReceivable':
//   case 'officeEquipment':
//   case 'commonStock':
//   case 'retainedEarnings':
//   case 'generalExpense':
//   case 'salaryExpense':
//   case 'costOfGoodsSold':
//   case 'wagesExpense':
//   case 'rentExpense':
//   case 'interestExpense':
//   case 'creditCardPayable':
//   case 'accountsPayable':
//   case 'loanPayable':
//   case 'loans':
//   case 'bondsPayable':
//   case 'unearnedRevenue':
//   case 'revenue':
//   case 'sales':
//   case 'serviceRevenue':
//   case 'interestRevenue':
//   case 'transactionTemplates':
//   case 'transactions':
//   case 'users':
//   default:
//     break
// }
