import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { TransactionTypeEnum } from 'src/common/enum/transaction-type.enum'
import { inventory } from 'src/drizzle/schemas'

@ObjectType()
export class Inventory implements InferSelectModel<typeof inventory> {
  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  itemName: string

  @Field()
  itemDescription: string

  @Field()
  quantity: number

  @Field()
  purchasePrice: string

  @Field()
  salePrice: string

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
