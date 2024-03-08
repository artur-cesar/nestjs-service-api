import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UserDTO {
  @IsOptional()
  id: string = null;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minUppercase: 1,
    minLength: 6,
    minSymbols: 1,
    minLowercase: 0,
    minNumbers: 0,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;

  @IsOptional()
  @IsDateString()
  updatedAt: string;

  @IsOptional()
  @IsDateString()
  createdAt: string;
}
