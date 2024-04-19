import { Field, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { accountsPayable } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@InputType()
export class CreateAccountsPayableInput
  implements InferInsertModel<typeof accountsPayable>
{
  @Field(() => String, { nullable: true })
  itemName: string;

  @Field(() => String, { nullable: true })
  quantity: number;

  @Field(() => String, { nullable: true })
  purchasePrice: string;

  @Field(() => String, { nullable: true })
  salePrice: string;

  @Field(() => String, { nullable: true })
  ownerId: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  itemDescription?: string;

  @Field(() => String, { nullable: true })
  account_type?: AccountTypeEnum;

  @Field(() => String, { description: 'GL Account ID' })
  accountId: string;
}
