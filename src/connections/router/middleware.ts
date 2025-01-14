// eslint-disable-next-line max-classes-per-file
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Log from '../../tools/logger';
import { randomUUID } from 'crypto';

@Injectable()
export class PerformanceLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const reqId = randomUUID();
    Log.time(reqId);

    res.once('finish', () => {
      Log.endTime(reqId, { path: req.originalUrl, method: req.method });
    });

    next();
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    try {
      const logBody: Record<string, string | Record<string, string>> = {
        method: req.method,
        path: req.path,
        ip: req.ip as string,
      };

      if (req.query) logBody.query = JSON.stringify(req.query);
      if (
        req.body !== undefined &&
        typeof req.body === 'object' &&
        Object.keys(req.body as Record<string, string>).length > 0
      ) {
        logBody.body = req.body as Record<string, string>;

        // Hide password in logs
        if (logBody.body.password) {
          logBody.body.password = '***';
        }
      }

      Logger.log('New req', logBody);
      next();
    } catch (err) {
      Logger.error('Middleware validation', err);
    }
  }
}
