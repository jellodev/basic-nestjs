import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('GraphQL');

  use(req: Request, res: Response, next: NextFunction): void {
    const { body } = req;
    const traceId = req.get('x-trace-id') || randomUUID();

    res.on('finish', () => {
      if (this.passLogging(body.operationName)) return;

      this.logger.log(
        `Res::${traceId}::${JSON.stringify({
          req: {
            query: body.query.replace(/[\n\s]+/g, ''),
            variables: body.variables,
          },
          res: res.statusCode,
        })}`,
      );
    });

    next();
  }

  private passLogging(operationName: string) {
    return operationName === 'IntrospectionQuery';
  }
}
