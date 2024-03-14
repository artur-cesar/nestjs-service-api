import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { In, Repository } from 'typeorm';
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
  ){}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    try {
      const {name, modalities} = createProfessorDto

      const modalitiesToSave = await this.modalityRepository.findBy({id: In(modalities)})
      const professor = await this.professorRepository.save({name})

      professor.modalities = modalitiesToSave;

      this.professorRepository.save(professor);

      return professor;
    } catch (error) {
      throw new BadRequestException({error, statusCode: HttpStatus.BAD_REQUEST})
    }
  }

  async findAll(): Promise<Professor[]> {
    try {
      return await this.professorRepository.find()
    } catch (error) {
      throw new BadRequestException({error, statusCode: HttpStatus.BAD_REQUEST})
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} professor`;
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professor`;
  }

  remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
