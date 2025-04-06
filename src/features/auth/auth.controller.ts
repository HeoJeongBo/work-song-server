import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/features/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signUp(CreateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/sign-in')
  signIn() {
    return this.authService.signIn();
  }

  @Post('/sign-out')
  signOut() {
    return this.authService.signOut();
  }
}
