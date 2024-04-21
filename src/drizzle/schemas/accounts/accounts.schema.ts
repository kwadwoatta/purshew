import { relations } from 'drizzle-orm'
import { decimal, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { AccountTypeEnum, accountTypeEnum } from 'src/common'
import { transactions, users } from '..'

export const accounts = pgTable('accounts', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  balance: decimal('balance').default('0.0').notNull(),
  description: text('description').notNull(),

  name: text('name'),
  type: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
    .notNull(),

  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
})

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  owner: one(users, {
    references: [users.id],
    fields: [accounts.ownerId],
  }),
  transactions: many(transactions, { relationName: 'transaction_owner' }),
}))
