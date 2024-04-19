import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountsReceivable {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: number;
}
