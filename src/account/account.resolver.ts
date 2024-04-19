import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/guard';
import { AccountService } from './account.service';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { Account } from './models/account.model';

@UseGuards(JwtGuard)
@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'accounts' })
  findAll() {
    return this.accountService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.findOne(id);
  }

  @Mutation(() => Account)
  updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountService.update(
      updateAccountInput.id,
      updateAccountInput,
    );
  }

  @Mutation(() => Account)
  removeAccount(@Args('id', { type: () => Int }) id: number) {
    return this.accountService.remove(id);
  }
}
