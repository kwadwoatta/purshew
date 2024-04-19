import { decimal, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { accounts } from '.';
import { users } from '../users';
import { AccountTypeEnum, accountTypeEnum } from './account-type.enum';

export const revenue = pgTable('revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  revenueName: text('revenue_name').notNull(),
  revenueDescription: text('revenue_description'),
  amount: decimal('amount').notNull(),
  account_type: accountTypeEnum('account_type')
    .default(AccountTypeEnum.revenue)
    .notNull(),

  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
});

export const sales = pgTable('sales', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  customerId: uuid('customer_id').references(() => users.id),
  salesAmount: decimal('sales_amount').notNull(),
  account_type: accountTypeEnum('account_type')
    .default(AccountTypeEnum.revenue)
    .notNull(),

  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.id, {
      onDelete: 'cascade',
    }),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
});

export const serviceRevenue = pgTable('service_revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  customerId: uuid('customer_id').references(() => users.id),
  serviceFee: decimal('service_fee').notNull(),
  account_type: accountTypeEnum('account_type')
    .default(AccountTypeEnum.revenue)
    .notNull(),

  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.id, {
      onDelete: 'cascade',
    }),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
});

export const interestRevenue = pgTable('interest_revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  interestAmount: decimal('interest_amount').notNull(),
  account_type: accountTypeEnum('account_type')
    .default(AccountTypeEnum.revenue)
    .notNull(),

  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.id, {
      onDelete: 'cascade',
    }),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
});
