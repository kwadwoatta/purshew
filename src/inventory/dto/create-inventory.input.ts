import { Field, ID, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { AccountTypeEnum, inventory } from 'src/drizzle/schemas'

@InputType()
export class CreateInventoryInput
  implements InferInsertModel<typeof inventory>
{
  @Field(() => ID)
  ownerId: string

  @Field()
  itemName: string

  @Field()
  quantity: number

  @Field()
  purchasePrice: string

  @Field()
  salePrice: string

  @Field()
  accountId: string

  @Field()
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => AccountTypeEnum)
  accountType: AccountTypeEnum

  @Field()
  itemDescription: string
}