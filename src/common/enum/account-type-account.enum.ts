// import { registerEnumType } from '@nestjs/graphql'
// import { pgEnum } from 'drizzle-orm/pg-core'
// import { ExtractTablesWithRelations, and, eq, sql } from 'drizzle-orm'
// import * as accountsSchema from 'src/drizzle/schema/accounts/account-types'

// type AccountTypeAccountKey = keyof ExtractTablesWithRelations<
//   typeof accountsSchema
// >

// export type AccountTypeAccountEnum = {
//   [K in AccountTypeAccountKey]: K;
// };

// export type OneOfAccountTypeAccountEnum = keyof AccountTypeAccountEnum;

// const a: OneOfAccountTypeAccountEnum = 'someKey';

// registerEnumType(AccountTypeAccountEnum, {
//   name: 'AccountTypeAccountEnum',
// })

// const transactionType = Object.values(AccountTypeAccountEnum) as [
//   AccountTypeAccountEnum,
//   ...AccountTypeAccountEnum[],
// ]

// export const transactionTypeEnum = pgEnum<
//   AccountTypeAccountEnum,
//   [AccountTypeAccountEnum, ...AccountTypeAccountEnum[]]
// >('transaction_type', transactionType)
