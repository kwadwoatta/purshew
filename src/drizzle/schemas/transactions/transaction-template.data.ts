import { ExtractTablesWithRelations } from 'drizzle-orm'
import * as schema from 'src/drizzle/schemas'
import { TransactionTemplateTypeEnum } from '../../../common/enum/transaction-template.enum'

export const transactionTemplatesData: {
  [key in TransactionTemplateTypeEnum]: {
    description: string
    debit_account: keyof ExtractTablesWithRelations<typeof schema>
    credit_account: keyof ExtractTablesWithRelations<typeof schema>
    balancing_transaction: string
  }
} = {
  [TransactionTemplateTypeEnum.cash_sale]: {
    description: 'Selling inventory for cash',
    debit_account: 'cash',
    credit_account: 'sales',
    balancing_transaction:
      'Increasing cash on hand (asset) and recording the sale (revenue)',
  },
  [TransactionTemplateTypeEnum.cash_purchase]: {
    description: 'Buying inventory with cash',
    debit_account: 'inventory',
    credit_account: 'cash',
    balancing_transaction:
      'Increasing inventory (asset) and decreasing cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.account_payable_purchase]: {
    description: 'Buying inventory on credit',
    debit_account: 'inventory',
    credit_account: 'accountsPayable',
    balancing_transaction:
      'Increasing inventory (asset) and increasing accounts payable (liability)',
  },
  [TransactionTemplateTypeEnum.account_payable_payment]: {
    description: 'Paying off account payable',
    debit_account: 'accountsPayable',
    credit_account: 'cash',
    balancing_transaction:
      'Decreasing accounts payable (liability) and decreasing cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.sales_invoice]: {
    description: 'Recording a sale on credit',
    debit_account: 'accountsReceivable',
    credit_account: 'sales',
    balancing_transaction:
      'Increasing accounts receivable (asset) and recording the sale (revenue)',
  },
  [TransactionTemplateTypeEnum.sales_receipt]: {
    description: 'Recording a payment from a customer on account',
    debit_account: 'cash',
    credit_account: 'accountsReceivable',
    balancing_transaction:
      'Increasing cash on hand (asset) and decreasing accounts receivable (asset)',
  },
  [TransactionTemplateTypeEnum.expense]: {
    description: 'Recording a business expense',
    debit_account: 'generalExpense',
    credit_account: 'cash',
    balancing_transaction:
      'Increasing expense (expense) and decreasing cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.salary_payment]: {
    description: 'Recording salary paid to employees',
    debit_account: 'salaryExpense',
    credit_account: 'cash',
    balancing_transaction:
      'Increasing salary expense (expense) and decreasing cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.equipment_purchase]: {
    description: 'Recording the purchase of office equipment',
    debit_account: 'officeEquipment',
    credit_account: 'cash',
    balancing_transaction:
      'Increasing the value of office equipment (asset) and decreasing the amount of cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.purchase_on_credit]: {
    description: 'Recording a purchase on credit',
    debit_account: 'accountsReceivable',
    credit_account: 'accountsPayable',
    balancing_transaction:
      'Increasing the amount owed to suppliers (liability) and the amount customers owe us (asset)',
  },
  [TransactionTemplateTypeEnum.debt_consolidation]: {
    description: 'Recording a debt consolidation',
    debit_account: 'accountsPayable',
    credit_account: 'loanPayable',
    balancing_transaction:
      'Decreasing the amount owed to suppliers (liability) and increasing the amount of loan payable (liability)',
  },
  [TransactionTemplateTypeEnum.credit_card_payoff]: {
    description: 'Recording a credit card payoff',
    debit_account: 'creditCardPayable',
    credit_account: 'cash',
    balancing_transaction:
      'Decreasing the amount owed on the credit card (liability) and decreasing the amount of cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.kwame_initial_capital]: {
    description: 'Recording initial capital',
    debit_account: 'cash',
    credit_account: 'capital',
    balancing_transaction:
      'Increasing cash on hand (asset) and recording the initial capital (equity)',
  },
  [TransactionTemplateTypeEnum.kwame_system_unit_purchase]: {
    description: 'Buying System Units',
    debit_account: 'inventory',
    credit_account: 'cash',
    balancing_transaction:
      'Increasing inventory (asset) and decreasing cash on hand (asset)',
  },
  [TransactionTemplateTypeEnum.kwame_system_unit_sale]: {
    description: 'Selling System Units',
    debit_account: 'cash',
    credit_account: 'sales',
    balancing_transaction:
      'Increasing cash on hand (asset) and recording the sale (revenue)',
  },
}
