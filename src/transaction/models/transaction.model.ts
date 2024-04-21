import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { transactions } from 'src/drizzle/schema'

@ObjectType()
export class Transaction implements InferSelectModel<typeof transactions> {
  @Field()
  debitAmount: string

  @Field()
  creditAmount: string

  @Field()
  debitAccountName: string

  @Field()
  creditAccountName: string

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
