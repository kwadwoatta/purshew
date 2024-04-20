import { Field, ID, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { accountsPayable } from 'src/drizzle/schemas'
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum'

@InputType()
export class CreateAccountsPayableInput
  implements InferInsertModel<typeof accountsPayable>
{
  @Field()
  itemName: string

  @Field()
  quantity: number

  @Field()
  purchasePrice: string

  @Field()
  salePrice: string

  @Field()
  ownerId: string

  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  itemDescription: string

  @Field(() => AccountTypeEnum)
  accountType: AccountTypeEnum

  @Field(() => ID, { description: 'GL Account ID' })
  accountId: string
}
