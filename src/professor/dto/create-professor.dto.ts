import { ArrayNotEmpty, IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class CreateProfessorDto {
  @IsString()
  name: string;

  @IsUUID("4", {each: true})
  @ArrayNotEmpty()
  modalityIds: string[];

  @IsEnum(Gender)
  gender: string;
}
