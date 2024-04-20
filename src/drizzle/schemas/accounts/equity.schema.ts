import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { accounts } from '.'
import { users } from '../users'
import { AccountTypeEnum, accountTypeEnum } from './account-type.enum'

export const commonStock = pgTable('common_stock', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  itemName: text('item_name').notNull(),
  itemDescription: text('item_description'),
  quantity: integer('quantity').notNull(),
  purchasePrice: decimal('purchase_price').notNull(),
  salePrice: decimal('sale_price').notNull(),
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

  earnings: decimal('earnings').notNull(),
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
