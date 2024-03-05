import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class MeDTO {
  @IsString()
  token: string;
}
