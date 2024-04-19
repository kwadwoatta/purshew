import { Field, ID, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { TransactionTypeEnum, transactions } from 'src/drizzle/schemas';

@InputType()
export class CreateTransactionInput
  implements InferInsertModel<typeof transactions>
{
  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  fromAccountId: string;

  @Field(() => ID)
  toAccountId: string;

  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  amount: string;

  @Field()
  description: string;

  @Field()
  transactionType: TransactionTypeEnum;
}
