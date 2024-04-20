import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { inventory } from 'src/drizzle/schemas';
import { UpdateInventoryInput } from './dto/update-inventory.input';

@Injectable()
export class InventoryService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(input: any, userId: string) {
    return this.drizzle.db
      .insert(inventory)
      .values({
        userId: userId,
        ...input,
      })
      .returning();
  }

  findAll(userId: string) {
    return this.drizzle.db
      .select()
      .from(inventory)
      .where(and(eq(inventory.ownerId, userId)));
  }

  async findOne(userId: string, accountPayableId: string) {
    const inv = (
      await this.drizzle.db
        .select()
        .from(inventory)
        .where(
          and(
            eq(inventory.ownerId, userId),
            eq(inventory.id, accountPayableId),
          ),
        )
    )[0];

    if (!inv) {
      throw new NotFoundException();
    }

    return inv;
  }

  update(userId: string, input: UpdateInventoryInput) {
    return this.drizzle.db
      .update(inventory)
      .set({
        ...input,
      })
      .where(and(eq(inventory.ownerId, userId), eq(inventory.id, input.id)));
  }

  remove(id: string, userId: string) {
    return this.drizzle.db
      .select()
      .from(inventory)
      .where(and(eq(inventory.ownerId, userId), eq(inventory.id, id)));
  }
}
