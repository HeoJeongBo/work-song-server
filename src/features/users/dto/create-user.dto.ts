import { User } from '@prisma/client';

export class CreateUserDto {
  id: number;
  email: string;
  name?: string | null;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}
