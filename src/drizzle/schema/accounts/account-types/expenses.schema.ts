import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import {
  AccountTypeEnum,
  accountTypeEnum,
  transactionTypeEnum,
} from 'src/common/enum'

import { accounts } from '..'
import { users } from '../../users'

export const generalExpense = pgTable('general_expense', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  expenseName: text('expense_name'),
  expenseValue: decimal('expense_value'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.expense)
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

export const salaryExpense = pgTable('salary_expense', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  expenseName: text('expense_name'),
  expenseValue: decimal('expense_value'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.expense)
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

export const costOfGoodsSold = pgTable('cost_of_goods_sold', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  itemName: text('item_name'),
  itemDescription: text('item_description'),
  quantity: integer('quantity'),
  purchasePrice: decimal('purchase_price'),
  salePrice: decimal('sale_price'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.expense)
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

export const wagesExpense = pgTable('wages_expense', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  wages: decimal('wages'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.expense)
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

export const rentExpense = pgTable('rent_expense', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  rent: decimal('rent'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.expense)
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

export const interestExpense = pgTable('interest_expense', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  interest: decimal('interest'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.expense)
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
