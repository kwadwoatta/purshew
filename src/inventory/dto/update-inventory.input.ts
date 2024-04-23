import { Field, InputType, PartialType } from '@nestjs/graphql'
import { AddToInventoryInput } from './add-to-inventory.input'

@InputType()
export class UpdateInventoryInput extends PartialType(AddToInventoryInput) {
  @Field(() => String)
  id: string
}
