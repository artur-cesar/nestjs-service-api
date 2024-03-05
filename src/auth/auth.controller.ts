import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ForgetPasswordDTO } from './dto/forget-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }

  @Post('forget')
  async forget(@Body() { email }: ForgetPasswordDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: ResetPasswordDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    // return headers;
    // return await this.authService.checkToken(headers.authorization.split(' ')[1]);
    return { user };
  }
}
