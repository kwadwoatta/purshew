import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { accountTypeEnum } from '../accounts/account-type.enum'
import { transactionTemplateTypeEnum } from './transaction-template.enum'

export const transactionTemplates = pgTable('transaction_templates', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  type: transactionTemplateTypeEnum('type').notNull(),
  description: text('description').notNull(),
  balancingTransaction: text('balancing_transaction').notNull(),

  debitAccountName: text('debit_account_name').notNull(),
  creditAccountName: text('credit_account_name').notNull(),
  debitAccountAccountType: accountTypeEnum(
    'debit_account_account_type',
  ).notNull(),
  creditAccountAccountType: accountTypeEnum(
    'credit_account_account_type',
  ).notNull(),
})
