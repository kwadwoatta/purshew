import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: number;
}
