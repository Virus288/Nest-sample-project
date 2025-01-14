import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleware, PerformanceLoggerMiddleware } from './connections/router/middleware';
import { ETime } from './enums/time';
import GetUserModule from './modules/user/subModules/get/getUser.module';
import getConfig from './tools/configLoader';

@Module({
  imports: [
    GetUserModule,
    ThrottlerModule.forRoot([
      {
        ttl: ETime.ThrottleTTL,
        limit: getConfig().rateLimit,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export default class AppModule implements NestModule {
  configure(customer: MiddlewareConsumer): void {
    customer.apply(LoggerMiddleware, PerformanceLoggerMiddleware).forRoutes('*');
  }
}
