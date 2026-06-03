import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  private readonly logger = new Logger("LoggerMiddleware", { timestamp: false, });

  use(req: any, res: any, next: () => void) {
    this.logger.log(`INFO: Received a request from ${req.headers.host} on route ${req.originalUrl}`);
    next();
  }
}
