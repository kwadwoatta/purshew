import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionTemplateInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
