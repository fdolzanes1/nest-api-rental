import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @Transform((params) => params.value.toUpperCase())
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(250)
  //@IsEmailUnique()
  email: string

  @IsString()
  @MaxLength(100)
  driverLicense: string

  @IsString()
  @IsOptional()
  avatar: string

  @IsOptional()
  roleId: number
}
