import { IsArray, IsEnum, IsString } from "class-validator";
import { Gender } from "../../enums/gender.enum";

export class CreateProfessorDto {

    @IsString()
    name: string;

    @IsArray()
    modalities: string[]

    @IsEnum(Gender)
    gender: string;
}
