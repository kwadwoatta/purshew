import { Injectable, NotFoundException } from '@nestjs/common'
import { ExtractTablesWithRelations, and, eq } from 'drizzle-orm'
import { Account } from 'src/account/models/account.model'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { transactionTemplates, transactions } from 'src/drizzle/schemas'
import * as accountsSchema from 'src/drizzle/schemas/accounts/account-types'
import { Transaction } from 'src/transaction/models/transaction.model'
import { TransactionTemplate } from './models/transaction-template.model'

@Injectable()
export class TransactionTemplateService {
  constructor(private readonly drizzle: DrizzleService) {}

  async execute(
    amount: number,
    txTemplate: TransactionTemplate,
    userId: string,
    accounts: Account[],
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

    const accountIdForDebit = accounts.find(
      (a) => a.type === debitAccountTable.accountType.default,
    ).id
    const accountIdForCredit = accounts.find(
      (a) => a.type === creditAccountTable.accountType.default,
    ).id

    let completedTransaction: Transaction

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

      completedTransaction = (
        await tx
          .insert(transactions)
          .values({
            description,
            ownerId: userId,
            debitAccountId,
            creditAccountId,
            debitAccountAccountId: accountIdForDebit,
            creditAccountAccountId: accountIdForCredit,
            amount: String(amount),
          })
          .returning()
      )[0]
    })

    return completedTransaction
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
