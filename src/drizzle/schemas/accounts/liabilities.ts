import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { accounts } from '.';
import { users } from '../users';
import { AccountTypeEnum, accountTypeEnum } from './account-type.enum';

export const accountsPayable = pgTable('accounts_payable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  itemName: text('item_name').notNull(),
  itemDescription: text('item_description'),
  quantity: integer('quantity').notNull(),
  purchasePrice: decimal('purchase_price').notNull(),
  salePrice: decimal('sale_price').notNull(),
  account_type: accountTypeEnum('account_type')
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
});

export const loans = pgTable('loans', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lenderId: uuid('lender_id').references(() => users.id),
  amount: decimal('amount').notNull(),
  account_type: accountTypeEnum('account_type')
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
});

export const bondsPayable = pgTable('bonds_payable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  bondholderId: uuid('bondholder_id').references(() => users.id),
  amount: decimal('amount').notNull(),
  account_type: accountTypeEnum('account_type')
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
});

export const unearnedRevenue = pgTable('unearned_revenue', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  customerId: uuid('customer_id').references(() => users.id),
  amount: decimal('amount').notNull(),
  account_type: accountTypeEnum('account_type')
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
});
