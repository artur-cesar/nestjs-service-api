import { IsString } from 'class-validator';

export class MeDTO {
  @IsString()
  token: string;
}
