import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { AccountTypeEnum, TransactionTypeEnum } from 'src/common'
import { accountsReceivable } from 'src/drizzle/schema'

@ObjectType()
export class AccountsReceivable
  implements InferInsertModel<typeof accountsReceivable>
{
  @Field(() => TransactionTypeEnum)
  transactionType: TransactionTypeEnum

  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => ID)
  customerId: string

  @Field()
  amount: string

  @Field(() => AccountTypeEnum)
  accountType: AccountTypeEnum

  @Field(() => ID)
  ownerId: string

  @Field(() => ID)
  accountId: string
}
