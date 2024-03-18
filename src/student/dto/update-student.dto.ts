import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEnum(Gender)
  gender: string;
}
