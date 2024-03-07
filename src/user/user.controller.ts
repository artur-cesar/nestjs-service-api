import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UserDTO } from './dto/user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO): Promise<UserDTO> {
    return await this.userService.create(data);
  }

  // @Roles(Role.Admin)
  @Get()
  async list(): Promise<UserDTO[]> {
    return await this.userService.list();
  }

  @Get(':id')
  async findById(@Param() { id }): Promise<UserDTO> {
    return await this.userService.find(id);
  }

  @Put(':id')
  async update(@Body() data: UserDTO, @Param() { id }): Promise<UserDTO> {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async patch(@Body() data: PatchUserDTO, @Param() { id }): Promise<UserDTO> {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async remove(@Param() { id }): Promise<UserDTO> {
    console.log(id);
    return await this.userService.remove(id);
  }
}
