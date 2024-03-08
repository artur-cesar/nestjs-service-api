export class LoginDTO {
  // @IsEmail()
  email: string;

  // @IsStrongPassword({
  //   minUppercase: 1,
  //   minLength: 6,
  //   minSymbols: 1,
  //   minLowercase: 0,
  //   minNumbers: 0,
  // })
  password: string;
}
