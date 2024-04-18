import { Provider } from '@nestjs/common';
import { Client } from 'pg';

export const PgAsyncProvider = 'PgAsyncProvider';

export const PgClientProvider: Provider = {
  useFactory: async () => {
    const client = new Client({
      connectionString: process.env.DB_URL,
    });

    await client.connect();

    return client;
  },
  provide: PgAsyncProvider,
};
