import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AuthInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
