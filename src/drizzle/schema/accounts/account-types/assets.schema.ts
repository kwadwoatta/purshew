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
  CashNameEnum,
  OfficeEquipmentNameEnum,
  accountTypeEnum,
  cashNameEnum,
  officeEquipmentNameEnum,
  transactionTypeEnum,
} from 'src/common/enum'
import { accounts } from '..'
import { users } from '../../users'

export const cash = pgTable('cash', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: cashNameEnum('name').default(CashNameEnum.US_DOLLAR).notNull(),
  description: text('description'),

  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
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

export const inventory = pgTable('inventory', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  quantity: integer('quantity'),
  purchasePrice: decimal('purchase_price'),
  salePrice: decimal('sale_price'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
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

export const property = pgTable('property', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  propertyName: text('property_name'),
  propertyValue: decimal('property_value'),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
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

export const equipment = pgTable('equipment', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  equipmentName: text('equipment_name').notNull(),
  equipmentValue: decimal('equipment_value').notNull(),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
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

export const accountsReceivable = pgTable('accounts_receivable', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  customerId: uuid('customer_id')
    .notNull()
    .references(() => users.id),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
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

export const officeEquipment = pgTable('office_equipment', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),
  name: text('name'),
  description: text('description'),

  officeEquipmentName: officeEquipmentNameEnum('office_equipment_name')
    .default(OfficeEquipmentNameEnum.COMPUTER)
    .notNull(),
  officeEquipmentValue: decimal('office_equipment_value').notNull(),
  accountType: accountTypeEnum('account_type')
    .default(AccountTypeEnum.asset)
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
