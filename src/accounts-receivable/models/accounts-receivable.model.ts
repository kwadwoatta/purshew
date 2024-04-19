import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { InferSelectModel } from 'drizzle-orm';
import { accountsReceivable } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@ObjectType()
export class AccountsReceivable
  implements InferSelectModel<typeof accountsReceivable>
{
  @Field(() => Int)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  customerId: string;

  @Field(() => String)
  amount: string;

  @Field(() => AccountTypeEnum)
  account_type: AccountTypeEnum;

  @Field(() => String)
  ownerId: string;

  @Field(() => String)
  accountId: string;
}
