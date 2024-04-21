import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { AccountTypeEnum, TransactionTemplateTypeEnum } from 'src/common'
import { transactionTemplates } from 'src/drizzle/schema'

@ObjectType()
export class TransactionTemplate
  implements InferSelectModel<typeof transactionTemplates>
{
  @Field(() => ID)
  id: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => TransactionTemplateTypeEnum)
  type: TransactionTemplateTypeEnum

  @Field()
  description: string

  @Field()
  balancingTransaction: string

  @Field()
  debitAccountName: string

  @Field()
  creditAccountName: string

  @Field(() => AccountTypeEnum)
  debitAccountAccountType: AccountTypeEnum

  @Field(() => AccountTypeEnum)
  creditAccountAccountType: AccountTypeEnum
}
