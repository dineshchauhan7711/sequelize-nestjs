import { getMessage } from "./lang/message";
import  { Response } from 'express'

export function successResponse(res: Response, messageCode = null, data = null, statusCode = 200) {
     let response: any = {};
     response.success = true;
     response.message = getMessage(messageCode);
     if (data != null) {
          response.data = data;
     }
     return res.status(statusCode).send(response);
};

export function errorResponse(res: Response, messageCode = 9999, statusCode = 422) {
     let response: any = {};
     response.success = false;
     response.message = getMessage(messageCode);
     statusCode = (messageCode == 9999) ? 500 : statusCode;
     return res.status(statusCode).send(response)
};

