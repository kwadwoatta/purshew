import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field(() => Int)
  @IsString()
  @IsOptional()
  lastName?: string;
}
