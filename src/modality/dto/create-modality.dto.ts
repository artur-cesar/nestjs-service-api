import { IsOptional, IsString } from 'class-validator';

export class CreateModalityDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  createdAt: string;

  @IsString()
  @IsOptional()
  updatedAt: string;
}
