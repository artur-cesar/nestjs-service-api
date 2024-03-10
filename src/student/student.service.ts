import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      return await this.studentRepository.save(createStudentDto);
    } catch (error) {
      throw new BadRequestException({ error, statusCode: error.statuCode });
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      return await this.studentRepository.find({
        order: {
          createdAt: {
            direction: 'DESC',
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException({ error, statusCode: error.statuCode });
    }
  }

  async findOne(id: string): Promise<Student> {
    try {
      return await this.studentRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException({
        error,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  update(id: string, { name, email, phone }: UpdateStudentDto) {
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (phone) {
      data.phone = phone;
    }

    try {
      this.studentRepository.update(id, data);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException({
        error,
        statuCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
