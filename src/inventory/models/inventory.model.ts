import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InferSelectModel } from 'drizzle-orm';
import { inventory } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@ObjectType()
export class Inventory implements InferSelectModel<typeof inventory> {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  itemName: string;

  @Field()
  itemDescription: string;

  @Field()
  quantity: number;

  @Field()
  purchasePrice: string;

  @Field()
  salePrice: string;

  @Field()
  account_type: AccountTypeEnum;

  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  accountId: string;

  @Field()
  exampleField: number;
}
