import { IsOptional, IsUUID } from "class-validator";
import { Modality } from "../../modality/entities/modality.entity";

export class CreateRegistrationDto {

    @IsUUID("4")
    studentId: string;

    @IsUUID("4", {each: true})
    @IsOptional()
    modalityIds: Modality[]
}
