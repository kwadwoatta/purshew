import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { AccountTypeEnum, TransactionTypeEnum } from 'src/common'
import { inventory } from 'src/drizzle/schema'

@ObjectType()
export class Inventory implements InferInsertModel<typeof inventory> {
  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  itemName?: string

  @Field({ nullable: true })
  itemDescription?: string

  @Field({ nullable: true })
  quantity?: number

  @Field({ nullable: true })
  purchasePrice?: string

  @Field({ nullable: true })
  salePrice?: string

  @Field()
  accountType: AccountTypeEnum

  @Field(() => ID)
  ownerId: string

  @Field(() => ID)
  accountId: string

  @Field()
  amount: string

  @Field(() => TransactionTypeEnum)
  transactionType: TransactionTypeEnum
}
