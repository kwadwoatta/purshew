import { Field, Float, InputType } from '@nestjs/graphql'
import { TransactionTemplateTypeEnum } from 'src/drizzle/schemas'

@InputType()
export class ExecuteTransactionTemplateInput {
  @Field(() => TransactionTemplateTypeEnum, {
    description: 'The transaction template you want to execute',
  })
  template: TransactionTemplateTypeEnum

  @Field(() => Float, {
    description: 'The amount to be transacted between accounts',
  })
  amount: number
}
