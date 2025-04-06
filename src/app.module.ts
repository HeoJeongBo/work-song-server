import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
