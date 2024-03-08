import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  audience: string = 'users';
  issuer: string = 'login ';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
        issuer: this.issuer,
        audience: this.audience,
      },
    );
  }

  checkToken(
    token: string,
    audience: string = 'users',
    issuer: string = 'login ',
  ): any {
    try {
      const data: any = this.jwtService.verify(token, {
        audience: audience,
        issuer: issuer,
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string): boolean {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<object> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user === null || user === undefined) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    await this.checkPassword(password, user);

    const accessToken = await this.createToken(user);
    return { accessToken };
  }

  async forget(email: string): Promise<object> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );
    if (user) {
      const { envelope } = await this.mailer.sendMail({
        subject: 'Recuperação de senha',
        to: user.email,
        template: 'forget',
        context: {
          name: user.name,
          token,
        },
      });

      return { envelope };
    }

    throw new UnauthorizedException('E-mail not found!');
  }

  async reset(password: string, token: string): Promise<object> {
    try {
      const { id } = this.checkToken(token, 'users', 'forget');

      const user = await this.userService.updatePartial(id, { password });
      const accessToken = await this.createToken(user);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async register(data: RegisterDTO): Promise<object> {
    try {
      const user: User = await this.userService.create(data);

      const accesToken = await this.createToken(user);

      return { accesToken };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async checkPassword(password, user: User): Promise<void> {
    const pass = await bcrypt.compare(password, user.password);
    if (pass === false) {
      throw new UnauthorizedException('Invalid password');
    }
  }
}
