import { registerEnumType } from '@nestjs/graphql'
import { pgEnum } from 'drizzle-orm/pg-core'

export enum TransactionTemplateTypeEnum {
  cash_sale = 'cash_sale',
  cash_purchase = 'cash_purchase',
  account_payable_purchase = 'account_payable_purchase',
  account_payable_payment = 'account_payable_payment',
  sales_invoice = 'sales_invoice',
  sales_receipt = 'sales_receipt',
  expense = 'expense',
  salary_payment = 'salary_payment',
  purchase_on_credit = 'purchase_on_credit',
  debt_consolidation = 'debt_consolidation',
  credit_card_payoff = 'credit_card_payoff',
  equipment_purchase = 'equipment_purchase',
  kwame_initial_capital = 'kwame_initial_capital',
  kwame_system_unit_purchase = 'kwame_system_unit_purchase',
  kwame_system_unit_sale = 'kwame_system_unit_sale',
}

registerEnumType(TransactionTemplateTypeEnum, {
  name: 'TransactionTemplateTypeEnum',
})

const transactionTemplateType = Object.values(TransactionTemplateTypeEnum) as [
  TransactionTemplateTypeEnum,
  ...TransactionTemplateTypeEnum[],
]

export const transactionTemplateTypeEnum = pgEnum<
  TransactionTemplateTypeEnum,
  [TransactionTemplateTypeEnum, ...TransactionTemplateTypeEnum[]]
>('transaction_template_type', transactionTemplateType)
