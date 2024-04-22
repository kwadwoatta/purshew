import { registerEnumType } from '@nestjs/graphql'
import { pgEnum } from 'drizzle-orm/pg-core'

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
