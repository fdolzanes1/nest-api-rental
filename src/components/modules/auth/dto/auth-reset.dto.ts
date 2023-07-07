import { IsInt, IsJWT, MinLength } from 'class-validator'

export class AuthResetDTO {
  @IsInt()
  id: number

  @MinLength(6)
  password: string

  @IsJWT()
  token: string
}
