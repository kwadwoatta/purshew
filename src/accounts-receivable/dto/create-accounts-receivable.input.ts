import { Field, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { accountsReceivable } from 'src/drizzle/schemas'

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
}
