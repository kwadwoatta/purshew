import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateInventoryInput } from './create-inventory.input';

@InputType()
export class UpdateInventoryInput extends PartialType(CreateInventoryInput) {
  @Field(() => String)
  id: string;
}
