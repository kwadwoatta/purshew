import { Field, ID, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { transactions } from 'src/drizzle/schemas'

@InputType()
export class CreateTransactionInput
  implements Omit<InferInsertModel<typeof transactions>, 'ownerId'>
{
  @Field(() => ID)
  debitAccountAccountId: string

  @Field(() => ID)
  creditAccountAccountId: string

  @Field(() => ID)
  creditAccountId: string

  @Field(() => ID)
  debitAccountId: string

  @Field()
  amount: string

  @Field()
  description: string
}
