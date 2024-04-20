import { relations } from 'drizzle-orm'
import { decimal, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { accounts } from '../accounts'
import { users } from '../users'

import { registerEnumType } from '@nestjs/graphql'

export enum TransactionTypeEnum {
  debit = 'debit',
  credit = 'credit',
}

registerEnumType(TransactionTypeEnum, { name: 'TransactionTypeEnum' })

const transactionType = Object.values(TransactionTypeEnum) as [
  TransactionTypeEnum,
  ...TransactionTypeEnum[],
]

export const transactionTypeEnum = pgEnum<
  TransactionTypeEnum,
  [TransactionTypeEnum, ...TransactionTypeEnum[]]
>('transaction_type', transactionType)

export const transactions = pgTable('transactions', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').notNull().default('0.0'),
  description: decimal('description'),
  transactionType: transactionTypeEnum('transaction_type')
    .default(TransactionTypeEnum.credit)
    .notNull(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  fromAccountId: uuid('from_account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  toAccountId: uuid('to_account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  owner: one(users, {
    references: [users.id],
    fields: [transactions.ownerId],
    relationName: 'transaction_owner',
  }),
  fromAccount: one(accounts, {
    references: [accounts.id],
    fields: [transactions.fromAccountId],
    relationName: 'from_account',
  }),
}))
