import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
    @IsString()
    name: string;

    @IsArray()
    modalities: string[]

    @IsEnum(Gender)
    gender: string;
}
