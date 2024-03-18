import { PartialType } from '@nestjs/swagger';
import { CreateRegistrationDto } from './create-registration.dto';
import { IsOptional, IsUUID } from 'class-validator';
import { Modality } from '../../modality/entities/modality.entity';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {

    @IsUUID("4", {each: true})
    @IsOptional()
    modalityIds: Modality[]
}
