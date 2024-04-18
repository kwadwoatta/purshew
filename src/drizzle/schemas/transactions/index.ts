import { relations } from 'drizzle-orm';
import { decimal, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { accounts } from '../accounts';
import { users } from '../users';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'debit',
  'credit',
]);

export const transactions = pgTable('transactions', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount'),
  description: decimal('description'),
  transactionType: transactionTypeEnum('transaction_type')
    .default('credit')
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
});

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
  toAccount: one(accounts, {
    references: [accounts.id],
    fields: [transactions.toAccountId],
    relationName: 'to_account',
  }),
}));
