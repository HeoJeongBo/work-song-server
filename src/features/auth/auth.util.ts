import { Request } from 'express';

export function extractTokenFromHeader(request: Request): string | undefined {
  const authHeader = request.headers['authorization'];

  if (!authHeader || typeof authHeader !== 'string') {
    return undefined;
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return undefined;
  }

  return token;
}
