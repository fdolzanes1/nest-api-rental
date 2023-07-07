import { IsString, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateSpecificationDto {
  @IsString()
  @MaxLength(50)
  @Transform((params) => params.value.toUpperCase())
  name: string

  @IsString()
  @MaxLength(100)
  @Transform((params) => params.value.toUpperCase())
  description: string
}
