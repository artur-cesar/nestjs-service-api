import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { Modality } from './entities/modality.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModalityService {
  constructor(
    @InjectRepository(Modality)
    private readonly modalityRepository: Repository<Modality>,
  ) {}

  async create(createModalityDto: CreateModalityDto): Promise<Modality> {
    try {
      return await this.modalityRepository.save(createModalityDto);
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAll() {
    try {
      return await this.modalityRepository.find();
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findOne(id: string): Promise<Modality> {
    try {
      return await this.modalityRepository.findOneOrFail({
        where: { id },
        relations: {
          professors: true
        }
      });
    } catch (error) {
      throw new NotFoundException({ error, statusCode: HttpStatus.NOT_FOUND });
    }
  }

  async update(
    id: string,
    updateModalityDto: UpdateModalityDto,
  ): Promise<Modality> {
    try {
      await this.modalityRepository.update(id, updateModalityDto);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} modality`;
  }
}
