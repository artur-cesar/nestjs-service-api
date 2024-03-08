import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ForgetPasswordDTO } from './dto/forget-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDTO } from 'src/user/dto/user.dto';
import { join } from 'path';
import { FileSystemService } from 'src/file-system/file-system.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileSystemService: FileSystemService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDTO): Promise<object> {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() data: RegisterDTO): Promise<object> {
    return this.authService.register(data);
  }

  @Post('forget')
  async forget(
    @Body() { email }: ForgetPasswordDTO,
  ): Promise<object> {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: ResetPasswordDTO): Promise<object> {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user): Promise<any> {
    return user;
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async photo(
    @User() user: UserDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new MaxFileSizeValidator({
            maxSize: 1024 * Number(process.env.MAX_UPLOAD_FILE_SIZE_FACTOR),
          }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ): Promise<object> {
    const dashUserName = user.name
      .split(' ')
      .map((i) => i.toLocaleLowerCase())
      .join('-');

    const filePath = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${dashUserName}-${user.id}.png`,
    );

    try {
      await this.fileSystemService.upload(photo, filePath);
      return { success: true, filePath };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
