import { Field, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { transactions } from 'src/drizzle/schemas';

@InputType()
export class CreateTransactionInput
  implements InferInsertModel<typeof transactions>
{
  @Field(() => String, { nullable: true })
  ownerId: string;

  @Field(() => String, { nullable: true })
  fromAccountId: string;

  @Field(() => String, { nullable: true })
  toAccountId: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  amount?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  transactionType?: 'debit' | 'credit';
}
