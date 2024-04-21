import { registerEnumType } from '@nestjs/graphql'
import {
  decimal,
  integer,
  pgEnum,
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

export enum CashNameEnum {
  US_DOLLAR = 'US_DOLLAR',
}

registerEnumType(CashNameEnum, {
  name: 'CashNameEnum',
})

const cashName = Object.values(CashNameEnum) as [
  CashNameEnum,
  ...CashNameEnum[],
]

export const cashNameEnum = pgEnum<
  CashNameEnum,
  [CashNameEnum, ...CashNameEnum[]]
>('cash_name', cashName)

export const cash = pgTable('cash', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

  cashName: cashNameEnum('cash_name').default(CashNameEnum.US_DOLLAR).notNull(),
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

  itemName: text('item_name'),
  itemDescription: text('item_description'),
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

export enum OfficeEquipmentNameEnum {
  COMPUTER = 'COMPUTER',
  PRINTER = 'PRINTER',
  DESK = 'DESK',
  CHAIR = 'CHAIR',
}

registerEnumType(OfficeEquipmentNameEnum, {
  name: 'OfficeEquipmentNameEnum',
})

const officeEquipmentName = Object.values(OfficeEquipmentNameEnum) as [
  OfficeEquipmentNameEnum,
  ...OfficeEquipmentNameEnum[],
]

export const officeEquipmentNameEnum = pgEnum<
  OfficeEquipmentNameEnum,
  [OfficeEquipmentNameEnum, ...OfficeEquipmentNameEnum[]]
>('office_equipment_name', officeEquipmentName)

export const officeEquipment = pgTable('office_equipment', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  amount: decimal('amount').default('0.0').notNull(),
  transactionType: transactionTypeEnum('transaction_type').notNull(),

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
