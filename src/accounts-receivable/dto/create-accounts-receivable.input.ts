import { Field, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { TransactionTypeEnum } from 'src/common'
import { accountsReceivable } from 'src/drizzle/schema'

@InputType()
export class CreateAccountsReceivableInput
  implements InferInsertModel<typeof accountsReceivable>
{
  @Field(() => String)
  customerId: string

  @Field(() => String)
  amount: string

  @Field(() => String)
  ownerId: string

  @Field(() => String)
  accountId: string

  @Field(() => TransactionTypeEnum)
  transactionType: TransactionTypeEnum
}
