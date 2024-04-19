import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAccountsReceivableInput } from './create-accounts-receivable.input';

@InputType()
export class UpdateAccountsReceivableInput extends PartialType(
  CreateAccountsReceivableInput,
) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  customerId: string | undefined;

  @Field(() => String, { nullable: true })
  amount: string | undefined;

  @Field(() => String, { nullable: true })
  accountId: string | undefined;
}
