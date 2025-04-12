import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
