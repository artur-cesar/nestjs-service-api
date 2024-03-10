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
} from '@nestjs/common';
import { ModalityService } from './modality.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { Modality } from './entities/modality.entity';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('modalities')
export class ModalityController {
  constructor(private readonly modalityService: ModalityService) {}

  @Post()
  async create(@Body() createModalityDto: CreateModalityDto): Promise<Modality> {
    return await this.modalityService.create(createModalityDto);
  }

  @Get()
  async findAll(): Promise<Modality[]> {
    return await this.modalityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Modality> {
    return await this.modalityService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModalityDto: UpdateModalityDto,
  ): Promise<Modality> {
    return await this.modalityService.update(id, updateModalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modalityService.remove(+id);
  }
}
