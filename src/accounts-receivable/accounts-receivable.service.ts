import { Injectable } from '@nestjs/common';
import { CreateAccountsReceivableInput } from './dto/create-accounts-receivable.input';
import { UpdateAccountsReceivableInput } from './dto/update-accounts-receivable.input';

@Injectable()
export class AccountsReceivableService {
  create(createAccountsReceivableInput: CreateAccountsReceivableInput) {
    return 'This action adds a new accountsReceivable';
  }

  findAll() {
    return `This action returns all accountsReceivable`;
  }

  findOne(id: string) {
    return `This action returns a #${id} accountsReceivable`;
  }

  update(
    id: string,
    updateAccountsReceivableInput: UpdateAccountsReceivableInput,
  ) {
    return `This action updates a #${id} accountsReceivable`;
  }

  remove(id: string) {
    return `This action removes a #${id} accountsReceivable`;
  }
}
