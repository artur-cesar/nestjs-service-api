import { IsJWT, IsStrongPassword } from 'class-validator';

export class ResetPasswordDTO {
  @IsStrongPassword({
    minUppercase: 1,
    minLength: 6,
    minSymbols: 1,
    minLowercase: 0,
    minNumbers: 0,
  })
  password: string;

  @IsJWT()
  token: string;
}
