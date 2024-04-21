import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { accounts } from 'src/drizzle/schema'
import { User } from 'src/user/models/user.model'

@ObjectType()
export class Account implements InferSelectModel<typeof accounts> {
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

  @Field(() => User)
  owner: User
}
