import { Module } from '@nestjs/common';
import { AccountsReceivableService } from './accounts-receivable.service';
import { AccountsReceivableResolver } from './accounts-receivable.resolver';

@Module({
  providers: [AccountsReceivableResolver, AccountsReceivableService],
})
export class AccountsReceivableModule {}
