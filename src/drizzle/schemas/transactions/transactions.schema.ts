import { relations } from 'drizzle-orm'
import { decimal, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { accounts } from '../accounts'
import { users } from '../users'

export const transactions = pgTable('transactions', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').notNull().default('0.0'),
  description: text('description').notNull(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  debitAccountId: uuid('debit_account_id').notNull(),
  creditAccountId: uuid('credit_account_id').notNull(),

  debitAccountAccountId: uuid('debit_account_account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  creditAccountAccountId: uuid('credit_account_account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  owner: one(users, {
    references: [users.id],
    fields: [transactions.ownerId],
    relationName: 'transaction_owner',
  }),
  debitAccount: one(accounts, {
    references: [accounts.id],
    fields: [transactions.debitAccountId],
    relationName: 'debit_account',
  }),
  creditAccount: one(accounts, {
    references: [accounts.id],
    fields: [transactions.creditAccountId],
    relationName: 'credit_account',
  }),
}))
