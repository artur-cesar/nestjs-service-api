import { IsNumber, IsString } from 'class-validator';

export class CreateGraduationDto {
  @IsString()
  name: string;

  @IsNumber()
  order: number;

  @IsString()
  modalityId: string;
}
