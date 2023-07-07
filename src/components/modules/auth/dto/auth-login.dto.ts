import { IsEmail, MinLength } from 'class-validator'

export class AuthLoginDTO {
  @IsEmail()
  email: string

  @MinLength(6)
  password: string
}
