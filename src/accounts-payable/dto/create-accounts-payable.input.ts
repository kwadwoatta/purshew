import { Field, ID, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import { TransactionTypeEnum } from 'src/common/enum/transaction-type.enum'
import { accountsPayable } from 'src/drizzle/schemas'

@InputType()
export class CreateAccountsPayableInput
  implements InferInsertModel<typeof accountsPayable>
{
  @Field(() => TransactionTypeEnum)
  transactionType: TransactionTypeEnum

  amount?: string
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
