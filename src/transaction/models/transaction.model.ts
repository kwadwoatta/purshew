import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { transactions } from 'src/drizzle/schemas'

@ObjectType()
export class Transaction implements InferSelectModel<typeof transactions> {
  @Field(() => ID)
  debitAccountAccountId: string

  @Field(() => ID)
  creditAccountAccountId: string

  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  description: string

  @Field(() => ID)
  ownerId: string

  @Field()
  amount: string

  @Field(() => ID)
  debitAccountId: string

  @Field(() => ID)
  creditAccountId: string
}
