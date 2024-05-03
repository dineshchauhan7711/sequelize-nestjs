
import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// //DTO
import { HeaderDTO } from "./auth.dto";

// Response
import { errorResponse } from '../../response/response';

// Models
import { User } from "../../../module/users/user.entity";
import { UserSession } from "../../../module/users/user_session.entity";

// JWT 
import { JwtService } from "../../helper/jwt";

declare global {
     namespace Express {
          interface Request {
               user: {
                    id: number;
               };
          }
     }
}


@Injectable()
export class AuthMiddleware implements NestMiddleware {
     constructor(
          // Models
          @Inject(User) private readonly UserModel: typeof User,
          @Inject(UserSession) private readonly UserSessionModel: typeof UserSession,
          // JWT
          private readonly jwtService: JwtService
     ) { }
     async use(req: Request, res: Response, next: NextFunction) {
          try {
               const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

               // Validate the authorization header
               const dto = plainToClass(HeaderDTO, { authorization: headerToken });
               const errors = await validate(dto);
               if (errors.length > 0) {
                    return errorResponse(res, 1009)
               };

               // Verify token
               const tokenResponse = await this.jwtService.verifyJWTToken(headerToken);
               if (!tokenResponse.success) {
                    return errorResponse(res, 1009)
               };

               // Find authorization token
               const findAuth = await this.UserSessionModel.findOne({ where: { token: headerToken } });
               if (!findAuth) {
                    return errorResponse(res, 1009)
               };

               // Find user
               const findUser = await this.UserModel.findOne({ where: { id: findAuth.user_id } });
               if (!findUser) {
                    return errorResponse(res, 1009)
               };

               req.user = {
                    id: findUser.id
               }

               next();
          } catch (error) {
               console.log('error :>> ', error);
               return errorResponse(res, 9999)
          }
     }
}
