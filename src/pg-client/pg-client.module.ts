import { Global, Module } from '@nestjs/common';
import { PgClientProvider } from './pg-client.provider';
import { PgClientService } from './pg-client.service';

@Global()
@Module({
  providers: [PgClientProvider, PgClientService],
  exports: [PgClientService],
})
export class PgClientModule {}
