import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field(() => String, { description: 'name' })
  name: string;
}
