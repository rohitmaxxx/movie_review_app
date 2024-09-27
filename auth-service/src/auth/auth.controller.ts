  import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  // import { JwtAuthGuard } from './guards/jwt-auth.guard';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    // @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
      return this.authService.login(body);
    }

    @Post('register')
    async register(@Request() req) {
      return this.authService.register(req.body);
    }
  }
