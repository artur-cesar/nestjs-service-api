import { BadRequestException, NestMiddleware } from '@nestjs/common';
import * as uuidValidate from 'uuid-validate';
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    if (uuidValidate(id) === false) {
      throw new BadRequestException(`${id} is not a valid ID`);
    }

    next();
  }
}
