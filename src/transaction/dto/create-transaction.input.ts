import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: number;
}
