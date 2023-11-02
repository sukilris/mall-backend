import { INestApplication, Logger } from '@nestjs/common';
import type { AppConfigService } from './shared/services/app-config.service';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_SECURITY_AUTH } from './decorators/swagger.decorator';

/**
 * setup project swagger documentation
 */
export function setupSwagger(
  app: INestApplication,
  config: AppConfigService,
): void {
  const { enable, path } = config.swaggerConfig;
  if (!enable) return;

  const documentBuilder = new DocumentBuilder().setTitle(`Api Documentation`);

  // auth security
  documentBuilder.addSecurity(API_SECURITY_AUTH, {
    description: 'Auth',
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup(path, app, document);

  // started log
  const logger = new Logger('SwaggerModule');
  logger.log(
    `Document running on http://127.0.0.1:${config.appConfig.port}/${path}`,
  );
}
