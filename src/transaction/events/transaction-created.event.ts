import { CreateTransactionInput } from '../dto/create-transaction.input'

export enum TransactionCreatedEventType {
  'created' = 'order.created',
}

export class TransactionCreatedEvent implements CreateTransactionInput {
  amount: number
  description: string
  debitAccountName: string
  creditAccountName: string
}
