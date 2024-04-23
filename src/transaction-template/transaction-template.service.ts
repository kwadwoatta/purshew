import { Injectable, NotFoundException } from '@nestjs/common'
import { ExtractTablesWithRelations, and, eq } from 'drizzle-orm'
import { Account } from 'src/account/models/account.model'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { transactionTemplates } from 'src/drizzle/schema'
import * as accountsSchema from 'src/drizzle/schema/accounts/account-types'
import { TransactionService } from 'src/transaction/transaction.service'
import { TransactionTemplate } from './models/transaction-template.model'

@Injectable()
export class TransactionTemplateService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly txService: TransactionService,
  ) {}

  async execute(
    amount: number,
    txTemplate: TransactionTemplate,
    userId: string,
    userAccounts: Account[],
  ): Promise<JSON> {
    const { description } = txTemplate

    type AccountTypeAccountKey = keyof ExtractTablesWithRelations<
      typeof accountsSchema
    >

    const creditAccountName: AccountTypeAccountKey =
      txTemplate.creditAccountName as any
    const debitAccountName: AccountTypeAccountKey =
      txTemplate.debitAccountName as any

    return this.txService.create(
      amount,
      creditAccountName,
      debitAccountName,
      userId,
      userAccounts,
      description,
    )
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
