import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AccountModule } from './account/account.module'
import { AccountsPayableModule } from './accounts-payable/accounts-payable.module'
import { AccountsReceivableModule } from './accounts-receivable/accounts-receivable.module'
import { AuthModule } from './auth/auth.module'
import { DrizzleModule } from './drizzle/drizzle.module'
import { InventoryModule } from './inventory/inventory.module'
import { PgClientModule } from './pg-client/pg-client.module'
import { TransactionTemplateModule } from './transaction-template/transaction-template.module'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // formatError: (error: GraphQLFormattedError) => {
      //   const logger = new Logger();
      //   logger.error(error);
      //   const graphQLFormattedError: GraphQLFormattedError = {
      //     message: error?.message,
      //   };
      //   return graphQLFormattedError;
      // },
    }),
    DrizzleModule,
    PgClientModule,
    AuthModule,
    UserModule,
    AccountModule,
    TransactionModule,
    InventoryModule,
    AccountsPayableModule,
    AccountsReceivableModule,
    TransactionTemplateModule,
  ],
  providers: [],
})
export class AppModule {}

// {
//   "message": "missing FROM-clause entry for table \"accounts\"",
//   "locations": [
//     {
//       "line": 3,
//       "column": 3
//     }
//   ],
//   "path": [
//     "accounts"
//   ],
//   "extensions": {
//     "code": "INTERNAL_SERVER_ERROR",
//     "stacktrace": [
//       "error: missing FROM-clause entry for table \"accounts\"",
//       "    at /Users/princeofori/workspace/purshew/node_modules/.pnpm/pg@8.11.5/node_modules/pg/lib/client.js:526:17",
//       "    at processTicksAndRejections (node:internal/process/task_queues:95:5)",
//       "    at /Users/princeofori/workspace/purshew/node_modules/.pnpm/drizzle-orm@0.30.8_@types+pg@8.11.5_pg@8.11.5/node_modules/src/node-postgres/session.ts:66:19",
//       "    at target (/Users/princeofori/workspace/purshew/node_modules/.pnpm/@nestjs+core@10.3.7_@nestjs+common@10.3.7_@nestjs+platform-express@10.3.7_reflect-metadata@0.2.2_rxjs@7.8.1/node_modules/@nestjs/core/helpers/external-context-creator.js:74:28)",
//       "    at Object.accounts (/Users/princeofori/workspace/purshew/node_modules/.pnpm/@nestjs+core@10.3.7_@nestjs+common@10.3.7_@nestjs+platform-express@10.3.7_reflect-metadata@0.2.2_rxjs@7.8.1/node_modules/@nestjs/core/helpers/external-proxy.js:9:24)"
//     ]
//   }
// }
