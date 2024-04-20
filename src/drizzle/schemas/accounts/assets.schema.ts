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
import { accounts } from '.'
import { users } from '../users'
import { AccountTypeEnum, accountTypeEnum } from './account-type.enum'

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

  cashName: cashNameEnum('cash_name').default(CashNameEnum.US_DOLLAR).notNull(),
  cashValue: decimal('cash_value').notNull(),
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

  itemName: text('item_name').notNull(),
  itemDescription: text('item_description'),
  quantity: integer('quantity').notNull(),
  purchasePrice: decimal('purchase_price').notNull(),
  salePrice: decimal('sale_price').notNull(),
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

  propertyName: text('property_name').notNull(),
  propertyValue: decimal('property_value').notNull(),
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

  customerId: uuid('customer_id')
    .notNull()
    .references(() => users.id),
  amount: decimal('amount').notNull(),
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
