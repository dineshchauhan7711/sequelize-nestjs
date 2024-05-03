import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import express from 'express'

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
     public catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp()
          const response = ctx.getResponse() as express.Response
          response
               .status(422)
               .json({
                    success: false,
                    message: exception.response.message[0],
               });
     }
};