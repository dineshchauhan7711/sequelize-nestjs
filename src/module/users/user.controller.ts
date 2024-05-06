import { Controller, Get, Body, Req, Res, Post } from '@nestjs/common';
import { Request, Response } from 'express';

import { UsersService } from './users.service';

// DTO
import { LoginDTO, RegisterUserDTO } from './user.dto';

@Controller()
export class UserController {
     constructor(private readonly UsersService: UsersService) { }

     /** 
      * Login
      */
     @Post('/login')
     async Login(@Req() req: Request, @Res() res: Response, @Body() body: LoginDTO): Promise<any> {
          return this.UsersService.login(req, res, body);
     };

     /**
      * Register User
      */
     @Post('/register-user')
     registerUser(@Req() req: Request, @Res() res: Response, @Body() body: RegisterUserDTO,): Promise<any> {
          return this.UsersService.userRegister(req, res, body)
     };
     
};