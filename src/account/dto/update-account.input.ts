import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAccountInput } from './create-account.input';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => String)
  id: string;
}
