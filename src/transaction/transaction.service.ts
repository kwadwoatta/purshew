import { Injectable, NotFoundException } from '@nestjs/common'
import { ExtractTablesWithRelations, and, eq, sql } from 'drizzle-orm'
import { Account } from 'src/account/models/account.model'
import { AccountTypeEnum } from 'src/common'
import { TransactionTypeEnum } from 'src/common/enum'
import { DrizzleService } from 'src/drizzle/drizzle.service'
import { accounts, transactions } from 'src/drizzle/schema'
import * as accountsSchema from 'src/drizzle/schema/accounts/account-types'
import { UpdateTransactionInput } from './dto/update-transaction.input'

const balancingRules = {
  [AccountTypeEnum.asset]: {
    [TransactionTypeEnum.credit]: '-',
    [TransactionTypeEnum.debit]: '+',
  },
  [AccountTypeEnum.liability]: {
    [TransactionTypeEnum.credit]: '+',
    [TransactionTypeEnum.debit]: '-',
  },
  [AccountTypeEnum.equity]: {
    [TransactionTypeEnum.credit]: '+',
    [TransactionTypeEnum.debit]: '-',
  },
  [AccountTypeEnum.revenue]: {
    [TransactionTypeEnum.credit]: '+',
    [TransactionTypeEnum.debit]: '-',
  },
  [AccountTypeEnum.expense]: {
    [TransactionTypeEnum.credit]: '-',
    [TransactionTypeEnum.debit]: '+',
  },
}

type AccountTypeAccountKey = keyof ExtractTablesWithRelations<
  typeof accountsSchema
>

@Injectable()
export class TransactionService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(
    amount: number,
    creditAccountName: AccountTypeAccountKey,
    debitAccountName: AccountTypeAccountKey,
    userId: string,
    userAccounts: Account[],
    description: string,
  ) {
    const debitAccountTable = accountsSchema[debitAccountName]
    const creditAccountTable = accountsSchema[creditAccountName]

    const debitAccountAccountType = debitAccountTable.accountType
      .default as AccountTypeEnum
    const creditAccountAccountType = creditAccountTable.accountType
      .default as AccountTypeEnum

    const accountIdForDebit = userAccounts.find(
      (a) => a.type === debitAccountAccountType,
    ).id
    const accountIdForCredit = userAccounts.find(
      (a) => a.type === creditAccountAccountType,
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
            transactionType: TransactionTypeEnum.debit,
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
            transactionType: TransactionTypeEnum.credit,
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
          balance: sql`${accounts.balance} + ${String(balancingRules[debitAccountAccountType]['debit'] + amount)}`,
        })
        .where(
          and(eq(accounts.ownerId, userId), eq(accounts.id, accountIdForDebit)),
        )

      // update balance of credit account (asset, liability, equity, revenue)
      await tx
        .update(accounts)
        .set({
          balance: sql`${accounts.balance} + ${String(balancingRules[creditAccountAccountType]['credit'] + amount)}`,
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

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(transactions)
      .where(and(eq(transactions.ownerId, userId)))
  }

  async findOne(userId: string, accountPayableId: string) {
    const tx = (
      await this.drizzle.db
        .select()
        .from(transactions)
        .where(
          and(
            eq(transactions.ownerId, userId),
            eq(transactions.id, accountPayableId),
          ),
        )
    )[0]

    if (!tx) {
      throw new NotFoundException()
    }

    return tx
  }

  update(userId: string, input: UpdateTransactionInput) {
    return this.drizzle.db
      .update(transactions)
      .set({
        ...input,
      })
      .where(
        and(eq(transactions.ownerId, userId), eq(transactions.id, input.id)),
      )
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(transactions)
      .where(and(eq(transactions.ownerId, userId), eq(transactions.id, id)))
  }
}
