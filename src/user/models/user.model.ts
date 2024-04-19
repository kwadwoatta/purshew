import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Account } from 'src/account/models/account.model';
import { InferDrizzleModel } from 'src/common';

@ObjectType()
export class User implements Partial<InferDrizzleModel<'users', { accounts }>> {
  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => String, { description: 'name', nullable: true })
  name: string | undefined;

  @Field(() => GraphQLISODateTime, { description: 'createdAt' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'updatedAt' })
  updatedAt: Date;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'firstName', nullable: true })
  firstName: string | undefined;

  @Field(() => String, { description: 'lastName', nullable: true })
  lastName: string | undefined;

  @Field(() => [Account], { description: 'accounts' })
  accounts: InferDrizzleModel<'accounts', { owner; transactions }>[];
}
