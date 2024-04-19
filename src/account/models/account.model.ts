import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { InferDrizzleModel } from 'src/common';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Account implements InferDrizzleModel<'accounts'> {
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
  balance: string;

  @Field(() => AccountTypeEnum, { description: 'type' })
  type: AccountTypeEnum;

  @Field(() => String, { description: 'ownerId' })
  ownerId: string;

  // @Field(() => [Transaction], { description: 'transactions' })
  // transactions: Transaction[];

  @Field(() => User, { description: 'owner' })
  owner: User;
}
