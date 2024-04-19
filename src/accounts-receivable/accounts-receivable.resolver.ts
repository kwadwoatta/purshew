import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/guard';
import { AccountsReceivableService } from './accounts-receivable.service';
import { CreateAccountsReceivableInput } from './dto/create-accounts-receivable.input';
import { UpdateAccountsReceivableInput } from './dto/update-accounts-receivable.input';
import { AccountsReceivable } from './entities/accounts-receivable.entity';

UseGuards(JwtGuard);
@Resolver(() => AccountsReceivable)
export class AccountsReceivableResolver {
  constructor(
    private readonly accountsReceivableService: AccountsReceivableService,
  ) {}

  @Mutation(() => AccountsReceivable)
  createAccountsReceivable(
    @Args('createAccountsReceivableInput')
    createAccountsReceivableInput: CreateAccountsReceivableInput,
  ) {
    return this.accountsReceivableService.create(createAccountsReceivableInput);
  }

  @Query(() => [AccountsReceivable], { name: 'accountsReceivable' })
  findAll() {
    return this.accountsReceivableService.findAll();
  }

  @Query(() => AccountsReceivable, { name: 'accountsReceivable' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.accountsReceivableService.findOne(id);
  }

  @Mutation(() => AccountsReceivable)
  updateAccountsReceivable(
    @Args('updateAccountsReceivableInput')
    updateAccountsReceivableInput: UpdateAccountsReceivableInput,
  ) {
    return this.accountsReceivableService.update(
      updateAccountsReceivableInput.id,
      updateAccountsReceivableInput,
    );
  }

  @Mutation(() => AccountsReceivable)
  removeAccountsReceivable(@Args('id', { type: () => String }) id: string) {
    return this.accountsReceivableService.remove(id);
  }
}
