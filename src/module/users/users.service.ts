import { Injectable, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { compareSync } from "bcryptjs";

// Model
import { User } from './user.entity';
import { UserSession } from "./user_session.entity";

// Response
import { successResponse, errorResponse } from '../../core/response/response';

// JWT
import { JwtService } from "../../core/helper/jwt";

@Injectable()
export class UsersService {
    constructor(
        @Inject(User) private readonly UserModel: typeof User,
        @Inject(UserSession) private readonly UserSessionModel: typeof UserSession,
        private readonly jwtService: JwtService
    ) { }

    /**
    * Login
    */
    async login(req: Request, res: Response, body: any): Promise<any> {
        try {
            const { password } = body;
            const email = (body.email).toLowerCase();

            // Check email
            const findUser = await this.UserModel.findOne({ where: { email } });
            if (!findUser) {
                return errorResponse(res, 1005)
            };

            // Check password
            if (!compareSync(password, findUser.password)) {
                return errorResponse(res, 1005)
            };

            // Generate JWT
            const tokenResponse = await this.jwtService.generateJWTToken({ payload: { id: findUser.id, email: findUser.email } });
            if (!tokenResponse.success) {
                return errorResponse(res, 1010)
            };

            // Store token in DB
            await this.UserSessionModel.create({ token: tokenResponse.token, user_id: findUser.id });

            // Final Response
            let response = {
                email: findUser.email,
                token: tokenResponse.token
            };
            return successResponse(res, 1002, response)
        } catch (error) {
            console.log('error :>> ', error);
            return errorResponse(res, 9999)
        }
    };

}
