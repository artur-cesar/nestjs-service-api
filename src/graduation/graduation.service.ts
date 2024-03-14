import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGraduationDto } from './dto/create-graduation.dto';
import { UpdateGraduationDto } from './dto/update-graduation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Graduation } from './entities/graduation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GraduationService {
  constructor(
    @InjectRepository(Graduation)
    private readonly graduationRepository: Repository<Graduation>,
  ) {}

  async create(createGraduationDto: CreateGraduationDto): Promise<Graduation> {
    try {
      const graduation =
      await this.graduationRepository.create(createGraduationDto);
      return await this.graduationRepository.save(graduation);
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAll(): Promise<Graduation[]> {
    try {
      return await this.graduationRepository.find();
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findAllByModality(modalityId: string): Promise<Graduation[]> {
    try {
      if (!modalityId) {
        throw new BadRequestException({
          error: { message: 'modalityId must be provided' },
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return await this.graduationRepository.find({ where: { modalityId }, order: {
        order: {
          direction: 'ASC',
        },
      } });
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findOne(id: string): Promise<Graduation> {
    try {
      return await this.graduationRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(
    id: string,
    { name, order }: UpdateGraduationDto,
  ): Promise<void> {
    try {
      const data: any = {};
      if (name) {
        data.name = name;
      }

      if (order) {
        data.order = order;
      }
      await this.graduationRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async batchUpdate(graduations) {
    try {
      await graduations.forEach(async (graduation) => {
        this.graduationRepository.update(graduation.id, graduation)
      });
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} graduation`;
  }
}
