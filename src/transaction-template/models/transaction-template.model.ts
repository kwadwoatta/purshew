import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { AccountTypeEnum } from 'src/common'
import {
  TransactionTemplateTypeEnum,
  transactionTemplates,
} from 'src/drizzle/schemas'

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
