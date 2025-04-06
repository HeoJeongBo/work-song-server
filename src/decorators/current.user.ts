import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  <T extends { user: User }>(_: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<T>();

    return request.user;
  },
);
