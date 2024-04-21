import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTransactionInput {
  @Field()
  amount: number

  @Field()
  description: string

  @Field()
  debitAccountName: string

  @Field()
  creditAccountName: string
}
