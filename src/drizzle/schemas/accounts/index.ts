import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { transactions, users } from '..';

export const accountTypeEnum = pgEnum('account_type', [
  'asset',
  'liability',
  'equity',
  'revenue',
  'expense',
]);

export const accounts = pgTable('accounts', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  name: text('name'),
  description: text('description'),
  balance: doublePrecision('balance'),
  type: accountTypeEnum('account_type').default('asset').notNull(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
});

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  owner: one(users, {
    references: [users.id],
    fields: [accounts.ownerId],
  }),
  transactions: many(transactions, { relationName: 'transaction_owner' }),
}));

export * from './assets';
export * from './equity';
export * from './expenses';
export * from './liabilities';
export * from './revenue';
