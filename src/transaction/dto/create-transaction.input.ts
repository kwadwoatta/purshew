import { Field, ID, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { transactions } from 'src/drizzle/schemas'

@InputType()
export class CreateTransactionInput
  implements InferInsertModel<typeof transactions>
{
  @Field(() => ID)
  id: string

  @Field(() => ID)
  ownerId: string

  @Field(() => ID)
  creditAccountId: string

  @Field(() => ID)
  debitAccountId: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  amount: string

  @Field()
  description: string

  // @Field()
  // transactionType: TransactionTypeEnum;
}
