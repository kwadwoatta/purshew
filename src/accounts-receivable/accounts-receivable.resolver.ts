import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/user/models/user.model';
import { AccountsReceivableService } from './accounts-receivable.service';
import { CreateAccountsReceivableInput } from './dto/create-accounts-receivable.input';
import { UpdateAccountsReceivableInput } from './dto/update-accounts-receivable.input';
import { AccountsReceivable } from './models/accounts-receivable.model';

@UseGuards(JwtGuard)
@Resolver(() => AccountsReceivable)
export class AccountsReceivableResolver {
  constructor(
    private readonly accountsReceivableService: AccountsReceivableService,
  ) {}

  @Mutation(() => AccountsReceivable)
  createAccountsReceivable(
    @Args('createAccountsReceivableInput')
    createAccountsReceivableInput: CreateAccountsReceivableInput,
    @GetUser() user: User,
  ) {
    return this.accountsReceivableService.create(
      createAccountsReceivableInput,
      user.id,
    );
  }

  @Query(() => [AccountsReceivable], { name: 'accountsReceivableAll' })
  findAll(@GetUser() user: User) {
    return this.accountsReceivableService.findAll(user.id);
  }

  @Query(() => AccountsReceivable, { name: 'accountsReceivable' })
  findOne(@Args('id', { type: () => ID }) id: string, @GetUser() user: User) {
    return this.accountsReceivableService.findOne(user.id, id);
  }

  @Mutation(() => AccountsReceivable)
  updateAccountsReceivable(
    @Args('updateAccountsReceivableInput')
    updateAccountsReceivableInput: UpdateAccountsReceivableInput,
    @GetUser() user: User,
  ) {
    return this.accountsReceivableService.update(
      user.id,
      updateAccountsReceivableInput,
    );
  }

  @Mutation(() => AccountsReceivable)
  removeAccountsReceivable(
    @Args('id', { type: () => ID }) id: string,
    @GetUser() user: User,
  ) {
    return this.accountsReceivableService.remove(user.id, id);
  }
}
