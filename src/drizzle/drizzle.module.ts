import { Global, Module } from '@nestjs/common';

import { PgClientModule } from 'src/pg-client/pg-client.module';
import { drizzleProvider } from './drizzle.provider';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  imports: [PgClientModule],
  providers: [drizzleProvider, DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule {}
