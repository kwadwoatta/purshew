import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  lastName?: string;
}
