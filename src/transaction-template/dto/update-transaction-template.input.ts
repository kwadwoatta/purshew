import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateTransactionTemplateInput } from './create-transaction-template.input'

@InputType()
export class UpdateTransactionTemplateInput extends PartialType(
  CreateTransactionTemplateInput,
) {
  @Field(() => Int)
  id: number
}
