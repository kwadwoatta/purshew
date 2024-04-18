import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/drizzle/schemas';
import { UpdateUserInput } from './dto';

@Injectable()
export class UserService {
  constructor(private drizzle: DrizzleService) {}

  async update(userId: string, input: UpdateUserInput) {
    const user = (
      await this.drizzle.db
        .update(users)
        .set({
          ...input,
        })
        .where(eq(users.id, userId))
        .returning()
    )[0];

    delete user.hash;
    return user;
  }
}
