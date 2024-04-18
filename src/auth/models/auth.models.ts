import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String, { description: 'Access token for authentication' })
  access_token: string;
}
