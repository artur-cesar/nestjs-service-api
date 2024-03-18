import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { Professor } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Modality } from '../modality/entities/modality.entity';
import { ProfessorModality } from './entities/professor-modality.entity';

@Injectable()
export class ProfessorService {
  userRepository: any;

  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(Modality)
    private readonly modalityRepository: Repository<Modality>,
    @InjectRepository(ProfessorModality)
    private readonly professorModalityRepository: Repository<ProfessorModality>
  ){}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    try {
      const {gender, name, modalities} = createProfessorDto

      const modalitiesToSave = await this.modalityRepository.findBy({id: In(modalities)})
      const professor = await this.professorRepository.save({name, gender})

      professor.modalities = modalitiesToSave;

      this.professorRepository.save(professor);

      return professor;
    } catch (error) {
      throw new BadRequestException({error, statusCode: HttpStatus.BAD_REQUEST})
    }
  }

  async findAll(): Promise<Professor[]> {
    try {
      return await this.professorRepository.find({
        order: {
          createdAt: "DESC"
        },
        relations: {modalities: true}
      })
    } catch (error) {
      throw new BadRequestException({error, statusCode: HttpStatus.BAD_REQUEST})
    }
  }

  async findOne(id: string): Promise<Professor> {
    try {
      return await this.professorRepository.findOneOrFail({
        where: {id}, relations: { 
          modalities: true
         }
      })
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException({error: "Professor not found", statusCode: HttpStatus.NOT_FOUND})
      }
      
      throw new BadRequestException({error, statusCode: HttpStatus.BAD_REQUEST})
    }
  }

  async update(id: string, {name, gender, modalities }: UpdateProfessorDto) {

    try {
      const professor: any = {}

      if (name) {
        professor.name = name
      }

      if (gender) {
        professor.gender = gender
      }

      await this.professorRepository.update(id, professor);

      if (modalities) {
        const {toInsert, toRemove} = await this.classifyModalitisToPersistence(professor.id, modalities)

        await toInsert.forEach(async (modalityId) => {
          await this.professorModalityRepository.save({modalityId, professorId: id})
        });

        await toRemove.forEach(async (modalityId) => {
          await this.professorModalityRepository.createQueryBuilder()
            .delete()
            .where("modalityId = :modalityId and professorId = :professorId", {
              modalityId, professorId: id 
            }).execute()
        });
      }

      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException({
        error,
        statuCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  private async classifyModalitisToPersistence(professorId: string, modalityIds: string[]) {
    const alreadyInserted: string[] = (await this.professorModalityRepository
      .findBy({professorId})).map((modality) => modality.modalityId)

    const toInsert: string [] = modalityIds.filter(id => !alreadyInserted.includes(id))
    const toRemove: string [] = alreadyInserted.filter(id => !modalityIds.includes(id))

    return {toInsert, toRemove}
  }

  async remove(id: string): Promise<void> {
    try {
      await this.professorRepository.delete(id);
    } catch (error) {
      throw new BadRequestException({error, statusCode: HttpStatus.BAD_REQUEST})
    }
  }
}
