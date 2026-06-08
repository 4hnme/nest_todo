import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  private readonly logger = new Logger("LoggerMiddleware", { timestamp: false, });

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`INFO: Received a request from ${req.headers.host} on route ${req.originalUrl}`);
    next();
  }
}
