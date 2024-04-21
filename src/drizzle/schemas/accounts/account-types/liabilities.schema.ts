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
} from 'src/common'
import { accounts } from '..'
import { users } from '../../users'

export const creditCardPayable = pgTable('credit_card_payable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  cardName: text('card_name'),
  cardValue: decimal('card_value'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.liability)
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

export const accountsPayable = pgTable('accounts_payable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  itemName: text('item_name'),
  itemDescription: text('item_description'),
  quantity: integer('quantity'),
  purchasePrice: decimal('purchase_price'),
  salePrice: decimal('sale_price'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.liability)
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

export const loanPayable = pgTable('loan_payable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  loanName: text('loan_name'),
  loanValue: decimal('loan_value'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.liability)
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

export const loans = pgTable('loans', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  lenderId: uuid('lender_id').references(() => users.id),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.liability)
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

export const bondsPayable = pgTable('bonds_payable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.liability)
    .notNull(),

  bondholderId: uuid('bondholder_id').references(() => users.id),
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

export const unearnedRevenue = pgTable('unearned_revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.liability)
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
