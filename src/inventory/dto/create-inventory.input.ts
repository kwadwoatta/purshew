import { Field, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { inventory } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@InputType()
export class CreateInventoryInput
  implements InferInsertModel<typeof inventory>
{
  @Field(() => String, { nullable: true })
  ownerId: string;

  @Field(() => String, { nullable: true })
  itemName: string;

  @Field(() => String, { nullable: true })
  quantity: number;

  @Field(() => String, { nullable: true })
  purchasePrice: string;

  @Field(() => String, { nullable: true })
  salePrice: string;

  @Field(() => String, { nullable: true })
  accountId: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  account_type?: AccountTypeEnum;

  @Field(() => String, { nullable: true })
  itemDescription?: string;
}
