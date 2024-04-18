import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PgAsyncProvider } from './pg-client.provider';

@Injectable()
export class PgClientService {
  constructor(@Inject(PgAsyncProvider) readonly pgClient: Client) {}
}
