import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { extractTokenFromHeader } from './auth.util';
import { User } from '@prisma/client';

export interface AuthenticateRequest extends Request {
  user: User;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = extractTokenFromHeader(request);

    if (!token) return false;

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET')!;

      const payload = await this.jwtService.verifyAsync<User>(token, {
        secret: jwtSecret,
      });

      (request as AuthenticateRequest).user = payload;
    } catch {
      return false;
    }

    return true;
  }
}
