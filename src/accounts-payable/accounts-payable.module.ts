import { Module } from '@nestjs/common';
import { AccountsPayableService } from './accounts-payable.service';
import { AccountsPayableResolver } from './accounts-payable.resolver';

@Module({
  providers: [AccountsPayableResolver, AccountsPayableService],
})
export class AccountsPayableModule {}
