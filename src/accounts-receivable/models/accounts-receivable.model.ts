import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InferSelectModel } from 'drizzle-orm';
import { accountsReceivable } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@ObjectType()
export class AccountsReceivable
  implements InferSelectModel<typeof accountsReceivable>
{
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ID)
  customerId: string;

  @Field()
  amount: string;

  @Field(() => AccountTypeEnum)
  account_type: AccountTypeEnum;

  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  accountId: string;
}
