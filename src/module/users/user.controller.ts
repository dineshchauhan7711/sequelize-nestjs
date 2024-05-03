import { Controller, Get, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { UsersService } from './users.service';

// DTO
import { LoginDTO } from './user.dto';

@Controller('posts')
export class UserController {
     constructor(private readonly UsersService: UsersService) { }
     @Get()
     async Login(@Req() req: Request, @Res() res: Response, @Body() body: LoginDTO): Promise<any> {
          return this.UsersService.login(req, res, body);
     };

};