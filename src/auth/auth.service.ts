import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User): Promise<string> {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: 'login',
        audience: 'users',
      },
    );
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<Object> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user === null || user === undefined) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    await this.checkPassword(password, user);

    const accessToken = await this.createToken(user);
    return { accessToken };
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      //TO DO: send an e-mail
    }

    throw new UnauthorizedException('E-mail not found!');
  }

  async reset(password: string, token: string): Promise<string> {
    //TO DO: validate token

    //TO DO: extract id from JWT
    const id: string = 'uuid';
    const user: User = await this.prisma.user.update({
      data: { password },
      where: { id },
    });

    return this.createToken(user);
  }

  async register(data: RegisterDTO): Promise<Object> {
    try {
      data.birthAt = data.birthAt ? new Date(data.birthAt) : null;

      const user: User = await this.userService.create(data);

      const accesToken = await this.createToken(user);

      return { accesToken };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async checkPassword(password, user: User) {
    const pass = await bcrypt.compare(password, user.password)

    if (pass === false) {
      throw new UnauthorizedException("Invalid password");
    }
  }
}
