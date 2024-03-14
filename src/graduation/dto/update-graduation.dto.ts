import { PartialType } from '@nestjs/mapped-types';
import { CreateGraduationDto } from './create-graduation.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateGraduationDto extends PartialType(CreateGraduationDto) {
  @IsString()
  name: string;

  @IsNumber()
  order: number;

  @IsString()
  modalityId: string;
}
