import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto';
import { Auth } from './models/auth.models';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signup(@Args('signup') authInput: AuthInput) {
    return this.authService.login(authInput);
  }

  @Mutation(() => Auth)
  login(@Args('login') authInput: AuthInput) {
    return this.authService.signup(authInput);
  }
}
