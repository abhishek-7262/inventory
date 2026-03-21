import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.provider';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  // Basic SET
  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl);
    } else {
      await this.redis.set(key, value);
    }
  }

  // Basic GET
  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  // DELETE
  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  // ✅ Add HASH support (THIS FIXES YOUR ERROR)
  async setHash(
    key: string,
    data: Record<string, string>,
    ttl?: number,
  ): Promise<void> {
    await this.redis.hmset(key, data);

    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }

  // Optional: Get hash
  async getHash(key: string): Promise<Record<string, string>> {
    return this.redis.hgetall(key);
  }

  // Optional: Decrement (for stock handling 🔥)
  async decr(key: string): Promise<number> {
    return this.redis.decr(key);
  }

  // ✅ Pipeline (VERY IMPORTANT for performance)
  pipeline() {
    return this.redis.pipeline();
  }

  // Optional: direct client access
  getClient(): Redis {
    return this.redis;
  }
}
