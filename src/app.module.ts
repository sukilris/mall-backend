import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import configuration from './configuration';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './shared/services/app-config.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    RedisModule.forRootAsync(
      {
        useFactory: (configService: AppConfigService) => {
          return {
            readyLog: true,
            config: configService.redisConfig,
          };
        },
        inject: [AppConfigService],
      },
      true,
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfigService) => {
        return configService.typeormConfig;
      },
      inject: [AppConfigService],
    }),
    SharedModule,
    // business module
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
