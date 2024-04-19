import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { accounts } from 'src/drizzle/schemas';
import { AccountTypeEnum } from 'src/drizzle/schemas/accounts/account-type.enum';

@InputType()
export class CreateAccountInput implements InferInsertModel<typeof accounts> {
  @Field(() => String, { nullable: true })
  ownerId: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  balance?: string;

  @Field(() => String, { nullable: true })
  type?: AccountTypeEnum;
  @Field(() => String, { description: 'name' })
  name: string;
}
