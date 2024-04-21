import { registerEnumType } from '@nestjs/graphql';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum AccountTypeEnum {
  asset = 'asset',
  liability = 'liability',
  equity = 'equity',
  revenue = 'revenue',
  expense = 'expense',
}

registerEnumType(AccountTypeEnum, { name: 'AccountTypeEnum' });

const accountTypes = Object.values(AccountTypeEnum) as [
  AccountTypeEnum,
  ...AccountTypeEnum[],
];

export const accountTypeEnum = pgEnum<
  AccountTypeEnum,
  [AccountTypeEnum, ...AccountTypeEnum[]]
>('account_type', accountTypes);
