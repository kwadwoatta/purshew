import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { accounts } from 'src/drizzle/schema'

@ObjectType()
export class Account implements InferInsertModel<typeof accounts> {
  @Field(() => ID)
  id: string

  @Field()
  name: string

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

  @Field(() => ID)
  ownerId: string
}
