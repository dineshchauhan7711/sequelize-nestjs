import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from "./module/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
