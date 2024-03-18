import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Query, UseFilters } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { AuthGuard } from '../guards/auth.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { RoleGuard } from '../guards/role.guard';
import { Professor } from './entities/professor.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@UseFilters(HttpExceptionFilter)
@Roles(Role.Admin)
@Controller('professors')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return this.professorService.create(createProfessorDto);
  }

  @Get()
  async findAll(): Promise<Professor[]> {
    return await this.professorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.professorService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.professorService.remove(id);
  }
}
