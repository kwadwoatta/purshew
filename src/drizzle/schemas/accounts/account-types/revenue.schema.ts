import { decimal, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import {
  AccountTypeEnum,
  accountTypeEnum,
  transactionTypeEnum,
} from 'src/common'
import { accounts } from '..'
import { users } from '../../users'

export const revenue = pgTable('revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  revenueName: text('revenue_name'),
  revenueDescription: text('revenue_description'),

  accountType: accountTypeEnum('account_type')
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
})

export const sales = pgTable('sales', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  salesAmount: decimal('sales_amount'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.revenue)
    .notNull(),

  customerId: uuid('customer_id').references(() => users.id),
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
})

export const serviceRevenue = pgTable('service_revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  serviceFee: decimal('service_fee'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.revenue)
    .notNull(),

  customerId: uuid('customer_id').references(() => users.id),
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
})

export const interestRevenue = pgTable('interest_revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  interestAmount: decimal('interest_amount'),
  accountType: accountTypeEnum('account_type')
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
})
