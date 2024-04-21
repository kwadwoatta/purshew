import { registerEnumType } from '@nestjs/graphql'
import { pgEnum } from 'drizzle-orm/pg-core'

export enum TransactionTypeEnum {
  credit = 'credit',
  debit = 'debit',
}

registerEnumType(TransactionTypeEnum, {
  name: 'TransactionTypeEnum',
})

const transactionType = Object.values(TransactionTypeEnum) as [
  TransactionTypeEnum,
  ...TransactionTypeEnum[],
]

export const transactionTypeEnum = pgEnum<
  TransactionTypeEnum,
  [TransactionTypeEnum, ...TransactionTypeEnum[]]
>('transaction_type', transactionType)
