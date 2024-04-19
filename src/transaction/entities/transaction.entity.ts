import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { InferDrizzleModel } from 'src/common';

@ObjectType()
export class Transaction implements InferDrizzleModel<'transactions'> {
  // constructor() {
  //   const TransactionTypeUnion = createUnionType({
  //     name: 'TransactionTypeUnion',
  //     types: () => [...transactions.transactionType.enumValues as Type<string>[]],
  //   });
  // }

  // @Field(() => Account, { description: 'fromAccount' })
  // fromAccount: Partial<Account>;

  // @Field(() => User, { description: 'owner' })
  // owner: Account;

  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => GraphQLISODateTime, { description: 'createdAt' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'updatedAt' })
  updatedAt: Date;

  @Field(() => String, { description: 'description' })
  description: string;

  @Field(() => String, { description: 'ownerId' })
  ownerId: string;

  @Field(() => String, { description: 'amount' })
  amount: string;

  @Field(() => String, { description: 'transactionType' })
  transactionType: 'debit' | 'credit';

  @Field(() => String, { description: 'fromAccountId' })
  fromAccountId: string;

  @Field(() => String, { description: 'toAccountId' })
  toAccountId: string;
}
