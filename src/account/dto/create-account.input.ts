import { Field, ID, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { accounts } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@InputType()
export class CreateAccountInput implements InferInsertModel<typeof accounts> {
  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  description: string;

  @Field()
  balance: string;

  @Field(() => AccountTypeEnum)
  type: AccountTypeEnum;

  @Field()
  name: string;
}
