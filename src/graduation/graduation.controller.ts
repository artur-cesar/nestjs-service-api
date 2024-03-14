import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
  Put,
} from '@nestjs/common';
import { GraduationService } from './graduation.service';
import { CreateGraduationDto } from './dto/create-graduation.dto';
import { UpdateGraduationDto } from './dto/update-graduation.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { Graduation } from './entities/graduation.entity';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('graduations')
export class GraduationController {
  constructor(private readonly graduationService: GraduationService) {}

  @Post()
  create(
    @Body() createGraduationDto: CreateGraduationDto,
  ): Promise<Graduation> {
    return this.graduationService.create(createGraduationDto);
  }

  @Get()
  async findAll(@Query() { modalityId }): Promise<Graduation[]> {
    return await this.graduationService.findAllByModality(modalityId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Graduation> {
    return this.graduationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGraduationDto: UpdateGraduationDto,
  ): Promise<void> {
    return await this.graduationService.update(id, updateGraduationDto);
  }

  @Put()
  async batchUpdate(@Body() data): Promise<void> {
    return await this.graduationService.batchUpdate(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graduationService.remove(+id);
  }
}
