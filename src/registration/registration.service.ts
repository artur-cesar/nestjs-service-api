import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { In, Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';
import { Modality } from '../modality/entities/modality.entity';

@Injectable()
export class RegistrationService {

  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Modality)
    private readonly modalityRepository: Repository<Modality>
  ) {}

  async create({studentId, modalityIds}: CreateRegistrationDto) {
    try {
      const student: Student  = await this.studentRepository.findOne({where: {id: studentId}})
      const modalities: Modality[] = await this.modalityRepository.findBy({id: In(modalityIds)})
      return await this.registrationRepository.save({student, modalities})
    } catch (error) {
      if(error.code) {
        throw new BadRequestException("Student already has registration")
      }
    }
  }

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
