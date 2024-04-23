import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddToInventoryInput {
  @Field()
  itemDescription: string

  @Field()
  amount: number
}
