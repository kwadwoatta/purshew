import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Inventory {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: number;
}
