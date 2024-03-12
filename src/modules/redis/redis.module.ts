import { AppConfigService } from '@/shared/services/app-config.service';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { RedisClinet } from './redis.constants';

@Global()
@Module({})
export class RedisModule {
  static forRootAsync(): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: RedisClinet,
          useFactory: async (
            configService: AppConfigService,
          ): Promise<Redis> => {
            const redisClient = new Redis(configService.redisConfig);
            redisClient.on('error', (err) => {
              console.error('Redis error:', err);
              // 根据错误类型决定是否需要重连或者执行其他错误处理逻辑
            });
            return redisClient;
          },
          inject: [AppConfigService],
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
