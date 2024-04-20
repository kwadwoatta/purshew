import { Field, InputType } from '@nestjs/graphql'
import { InferInsertModel } from 'drizzle-orm'
import { users } from 'src/drizzle/schemas'

@InputType()
export class CreateUserInput implements InferInsertModel<typeof users> {
  @Field(() => String)
  email: string

  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  createdAt: Date

  @Field(() => String)
  updatedAt: Date

  @Field(() => String)
  hash: string

  @Field(() => String)
  firstName: string

  @Field(() => String)
  lastName: string
}
