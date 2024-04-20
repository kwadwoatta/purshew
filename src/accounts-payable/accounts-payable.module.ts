import { Module } from '@nestjs/common';
import { AccountsPayableResolver } from './accounts-payable.resolver';
import { AccountsPayableService } from './accounts-payable.service';

@Module({
  providers: [AccountsPayableResolver, AccountsPayableService],
})
export class AccountsPayableModule {}
