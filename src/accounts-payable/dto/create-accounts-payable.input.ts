import { Field, InputType, PartialType } from '@nestjs/graphql';
import { AccountsPayable } from '../models/accounts-payable.model';

@InputType()
export class CreateAccountsPayableInput extends PartialType(AccountsPayable) {
  @Field(() => String, { description: 'GL Account ID' })
  accountId: string;
}
