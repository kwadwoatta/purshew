import { CreateTransactionInput } from '../dto/create-transaction.input'

export enum TransactionCreatedEventType {
  'created' = 'order.created',
}

export class TransactionCreatedEvent implements CreateTransactionInput {
  debitAmount: string
  creditAmount: string
  debitAccountName: string
  creditAccountName: string
  debitAccountAccountId: string
  creditAccountAccountId: string
  creditAccountId: string
  debitAccountId: string
  amount: string
  description: string
}
