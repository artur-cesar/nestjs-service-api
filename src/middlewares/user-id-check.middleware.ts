import { BadRequestException, NestMiddleware } from '@nestjs/common';
var validate = require('uuid-validate');
import { NextFunction, Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (validate(id) === false) {
      throw new BadRequestException(`${id} is not a valid ID`);
    }

    next();
  }
}
