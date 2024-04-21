import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { accounts } from '..'
import { users } from '../../users'
import { AccountTypeEnum, accountTypeEnum } from '../account-type.enum'

export const capital = pgTable('capital', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),

  capitalName: text('capital_name'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.equity)
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

export const commonStock = pgTable('common_stock', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),

  itemName: text('item_name'),
  itemDescription: text('item_description'),
  quantity: integer('quantity'),
  purchasePrice: decimal('purchase_price'),
  salePrice: decimal('sale_price'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.equity)
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

export const retainedEarnings = pgTable('retained_earnings', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),

  earnings: decimal('earnings'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.equity)
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
