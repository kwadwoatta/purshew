import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAccountsPayableInput } from './create-accounts-payable.input';

@InputType()
export class UpdateAccountsPayableInput extends PartialType(
  CreateAccountsPayableInput,
) {
  @Field(() => String)
  id: string;
}
