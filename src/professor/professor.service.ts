import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Modality } from '../modality/entities/modality.entity';

@Injectable()
export class ProfessorService {

  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Modality)
    private readonly modalityRepository: Repository<Modality>
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    const { gender, name, modalityIds } = createProfessorDto;
    const modalities: Modality[] = await this.modalityRepository.findBy({id: In(modalityIds)})
    const professor = this.professorRepository.create({ name, gender })
    professor.modalities = modalities
    await this.professorRepository.save(professor);
    
    this.professorRepository.save(professor);

    return professor;
  }

  async findAll(): Promise<Professor[]> {
    return await this.professorRepository.find({
      order: {
        createdAt: 'DESC',
      }
    });
  }

  async findOne(id: string): Promise<Professor> {
    try {
      return await this.professorRepository.findOneOrFail({
        where: { id }
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Professor not found', {
          cause: new Error(),
          description: `Professor was not found for ID: ${id}`,
        });
      }

      throw new BadRequestException('Undefined error fetching professor');
    }
  }

  async update(id: string, { name, gender, modalities }: UpdateProfessorDto) {
    const professor: any = {};

    if (name) {
      professor.name = name;
    }

    if (gender) {
      professor.gender = gender;
    }

    await this.professorRepository.update(id, professor);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.professorRepository.delete(id);
  }
}
