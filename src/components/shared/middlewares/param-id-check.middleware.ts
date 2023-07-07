import { BadRequestException, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ServerErrors } from '../utils/constants/server-errors'

export class ParamIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException(ServerErrors.INVALID_ID)
    }
    next()
  }
}
