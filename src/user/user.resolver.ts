import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/guard';

import { GetUser } from 'src/auth/decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  getMe(@GetUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  updateUser(
    @GetUser('id') userId: string,
    @Args('updateUser') input: UpdateUserInput,
  ) {
    return this.userService.update(userId, input);
  }
}
