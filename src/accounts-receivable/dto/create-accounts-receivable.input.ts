import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountsReceivableInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: number;
}
