import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UserController } from "./user.controller";

import { JwtService } from "../../core/helper/jwt";

@Module({
  imports: [],
  providers: [...usersProviders, JwtService, UsersService],
  controllers: [UserController],
})
export class UsersModule { }
