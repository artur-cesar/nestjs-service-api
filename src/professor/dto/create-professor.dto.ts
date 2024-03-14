import { IsArray, IsDateString, IsString } from "class-validator";

export class CreateProfessorDto {

    @IsString()
    name: string;

    @IsArray()
    modalities: string[]

}
