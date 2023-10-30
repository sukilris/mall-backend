import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import configuration from './shared/services/configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
