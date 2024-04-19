import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { InferDrizzleModel } from 'src/common';

@ObjectType()
export class Account
  implements Partial<InferDrizzleModel<'accounts', { owner; transactions }>>
{
  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => String, { description: 'name' })
  name: string;

  @Field(() => GraphQLISODateTime, { description: 'createdAt' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'updatedAt' })
  updatedAt: Date;

  @Field(() => String, { description: 'description' })
  description: string;

  @Field(() => String, { description: 'balance' })
  balance: number;

  @Field(() => String, { description: 'type' })
  type: 'revenue' | 'asset' | 'liability' | 'equity' | 'expense';

  @Field(() => String, { description: 'ownerId' })
  ownerId: string;

  @Field(() => [Account], { description: 'transactions' })
  transactions: [];

  @Field(() => [Account], { description: 'owner' })
  owner: [];
}
