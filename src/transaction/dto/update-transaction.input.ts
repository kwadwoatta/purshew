import { Field, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { transactions } from 'src/drizzle/schema'

@InputType()
export class UpdateTransactionInput
  implements InferInsertModel<typeof transactions>
{
  @Field(() => String)
  description: string

  @Field(() => String)
  ownerId: string

  @Field(() => String)
  debitAccountName: string

  @Field(() => String)
  creditAccountName: string

  @Field(() => String)
  debitAccountId: string

  @Field(() => String)
  creditAccountId: string

  @Field(() => String)
  debitAccountAccountId: string

  @Field(() => String)
  creditAccountAccountId: string

  @Field(() => String)
  createdAt?: Date

  @Field(() => String)
  updatedAt?: Date

  @Field(() => String)
  amount?: string

  @Field(() => String)
  debitAmount?: string

  @Field(() => String)
  creditAmount?: string

  @Field(() => String)
  id: string
}
