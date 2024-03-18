import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class CreateStudentDto {
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
