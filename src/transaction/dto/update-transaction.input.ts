import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTransactionInput } from './create-transaction.input';

@InputType()
export class UpdateTransactionInput extends PartialType(
  CreateTransactionInput,
) {
  @Field(() => String)
  id: string;
}
