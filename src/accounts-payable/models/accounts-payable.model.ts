import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { InferSelectModel } from 'drizzle-orm';
import { accountsPayable } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@ObjectType()
export class AccountsPayable
  implements InferSelectModel<typeof accountsPayable>
{
  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => GraphQLISODateTime, { description: 'createdAt' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'updatedAt' })
  updatedAt: Date;

  @Field(() => String, { description: 'itemName' })
  itemName: string;

  @Field(() => String, { description: 'itemDescription' })
  itemDescription: string;

  @Field(() => Int, { description: 'quantity' })
  quantity: number;

  @Field(() => String, { description: 'purchasePrice' })
  purchasePrice: string;

  @Field(() => String, { description: 'salePrice' })
  salePrice: string;

  @Field(() => AccountTypeEnum, { description: 'account_type' })
  account_type: AccountTypeEnum;

  @Field(() => String, { description: 'ownerId' })
  ownerId: string;

  @Field(() => String, { description: 'accountId' })
  accountId: string;
}
