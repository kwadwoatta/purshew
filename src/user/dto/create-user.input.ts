import { Field, InputType } from '@nestjs/graphql';
import { InferInsertModel } from 'drizzle-orm';
import { users } from 'src/drizzle/schemas';

@InputType()
export class CreateUserInput implements InferInsertModel<typeof users> {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  createdAt?: Date;

  @Field(() => String, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  hash?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}
