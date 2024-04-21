import { Field, ID, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { accounts } from 'src/drizzle/schemas'

@InputType()
export class CreateAccountInput implements InferInsertModel<typeof accounts> {
  @Field(() => ID)
  ownerId: string

  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  description: string

  @Field()
  balance: string

  @Field(() => AccountTypeEnum)
  type: AccountTypeEnum

  @Field()
  name: string
}
