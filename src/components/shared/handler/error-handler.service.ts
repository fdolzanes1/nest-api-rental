import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { ServerErrors } from '../utils/constants/server-errors'

@Catch()
export class ErrorHandlerService implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message,
      })
    } else {
      response.status(500).json({
        statusCode: 500,
        message: exception instanceof Error ? exception.message : ServerErrors.INTERNAL_SERVER_ERROR,
      })
    }
  }
}
