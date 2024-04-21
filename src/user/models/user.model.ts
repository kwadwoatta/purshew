import { Field, ID, ObjectType } from '@nestjs/graphql'
import { InferSelectModel } from 'drizzle-orm'
import { users } from 'src/drizzle/schema'

@ObjectType()
export class User implements InferSelectModel<typeof users> {
  @Field(() => String)
  hash: string

  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name: string | undefined

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => String)
  email: string

  @Field(() => String, { nullable: true })
  firstName: string | undefined

  @Field(() => String, { nullable: true })
  lastName: string | undefined
}
