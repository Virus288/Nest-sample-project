import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import AppModule from './app.module';
import getConfig from './tools/configLoader';
import Log from './tools/logger';

/**
 * Initialize app.
 * @description Initialize application.
 * @returns {void} Void.
 * @async
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new Log(),
    cors: {
      origin: getConfig().corsOrigin,
      credentials: true,
    },
  });
  const helmetDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  const allowedUrls = getConfig().corsOrigin;
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          ...helmetDirectives,
          'form-action': ["'self'", ...allowedUrls],
          'script-src': ["'self'"],
          'default-src': ["'self'", 'data:'],
          'frame-ancestors': ["'self'", ...allowedUrls],
          'frame-src': ["'self'", ...allowedUrls],
          'connect-src': ["'self'", ...allowedUrls],
        },
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  new Log().error(
    'Bootstrap',
    'Got error while initializing application',
    (err as Error).message,
    (err as Error).stack,
  );
});
