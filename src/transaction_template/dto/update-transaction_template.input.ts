import { CreateTransactionTemplateInput } from './create-transaction_template.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionTemplateInput extends PartialType(CreateTransactionTemplateInput) {
  @Field(() => Int)
  id: number;
}
