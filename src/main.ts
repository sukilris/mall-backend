import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './shared/services/app-config.service';
import { AppLoggerService } from './shared/services/app-logger.service';
import { BaseExceptionFilter } from './filters/base.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { SharedModule } from './shared/shared.module';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Authguard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {bufferLogs: true});

    // app config service
    const configService = app.get(AppConfigService);

    // reflector
    const reflector = app.get(Reflector);

      // logger
  app.useLogger(app.get(AppLoggerService));

   // global filters
   app.useGlobalFilters(new BaseExceptionFilter(configService));

   // global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformInterceptor(reflector),
  );

  // global guards
  const jwtService = app.select(SharedModule).get(JwtService);
  const redisService = app.get(RedisService);

  app.useGlobalGuards(
    new Authguard(reflector, jwtService, configService, redisService),
  );

  await app.listen(3000);
}
bootstrap();
