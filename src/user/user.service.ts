import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorsCode } from '../enums/errors-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: UserDTO): Promise<User> {
    data.password = await this.generatePassword(data.password);
    try {
      return this.userRepository.save(data);
    } catch (error) {
      if (error.code === ErrorsCode.Integrity) {
        throw new ConflictException({
          error: 'Email must be unique.',
          statusCode: HttpStatus.CONFLICT,
        });
      }
    }
  }

  async list(): Promise<UserDTO[]> {
    return await this.userRepository.find();
  }

  async find(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException({ error, statusCode: HttpStatus.NOT_FOUND });
    }
  }

  async update(id: string, data: UserDTO): Promise<UserDTO> {
    data.password = await this.generatePassword(data.password);
    try {
      return await this.userRepository.save(data);
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async updatePartial(
    id: string,
    { name, email, birthAt, password, role }: PatchUserDTO,
  ): Promise<User> {
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (password) {
      data.password = await this.generatePassword(password);
    }

    if (role) {
      data.role = role;
    }

    try {
      this.userRepository.update(id, data);
      return this.find(id);
    } catch (error) {
      throw new BadRequestException({
        error,
        statuCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async remove(id: string): Promise<any> {
    if ((await this.exists(id)) === false) {
      throw new NotFoundException({
        error: 'User not found',
        statuCode: HttpStatus.NOT_FOUND,
      });
    }

    return await this.userRepository.delete(id);
  }

  private async exists(id: string): Promise<boolean> {
    const count: number = await this.userRepository.count({
      where: { id },
    });

    return +count > 0;
  }

  private async generatePassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
