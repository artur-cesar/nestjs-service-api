import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchUserDTO } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO): Promise<UserDTO> {
    data.birthAt = data.birthAt ? new Date(data.birthAt) : null;
    data.password = await this.generatePassword(data.password);
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException({
          error: 'Email must be unique.',
          statusCode: HttpStatus.CONFLICT,
        });
      }
    }
  }

  async list(): Promise<UserDTO[]> {
    return await this.prisma.user.findMany();
  }

  async find(id: string): Promise<UserDTO> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UserDTO): Promise<UserDTO> {
    data.birthAt = data.birthAt ? new Date(data.birthAt) : null;
    data.password = await this.generatePassword(data.password);
    return await this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async updatePartial(
    id: string,
    { name, email, birthAt, password, role }: PatchUserDTO,
  ): Promise<UserDTO> {
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

    return await this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async remove(id: string) {
    if ((await this.exists(id)) === false) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  private async exists(id: string) {
    const count: Number = await this.prisma.user.count({
      where: { id },
    });

    return +count > 0;
  }

  private async generatePassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
