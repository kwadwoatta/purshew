import { Field, Int, ObjectType } from '@nestjs/graphql';
import { InferDrizzleModel } from 'src/common';

@ObjectType()
export class User implements InferDrizzleModel<'users', { accounts }> {
  @Field(() => Int, { description: 'id' })
  id: string;

  @Field(() => Int, { description: 'name' })
  name: string;

  @Field(() => Int, { description: 'createdAt' })
  createdAt: Date;

  @Field(() => Int, { description: 'updatedAt' })
  updatedAt: Date;

  @Field(() => Int, { description: 'email' })
  email: string;

  @Field(() => Int, { description: 'hash' })
  hash: string;

  @Field(() => Int, { description: 'firstName' })
  firstName: string;

  @Field(() => Int, { description: 'lastName' })
  lastName: string;

  @Field(() => Int, { description: 'accounts' })
  accounts: InferDrizzleModel<'accounts', { owner; transactions }>[];
}
