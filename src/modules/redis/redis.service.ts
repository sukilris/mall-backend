import { RedisClinet } from '@/constants/redis';
import { Inject, Injectable } from '@nestjs/common';
import { Redis, RedisKey } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisClinet)
    private readonly redis: Redis,
  ) {}
  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number = 0): Promise<void> {
    if (ttl > 0) {
      await this.redis.set(key, value, 'EX', ttl);
    } else {
      await this.redis.set(key, value);
    }
  }
  async del(key: RedisKey[]): Promise<void> {
    await this.redis.del(key);
  }
}
