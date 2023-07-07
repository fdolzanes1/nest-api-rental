import { IsString, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateCategoryDto {
  @IsString()
  @MaxLength(50)
  @Transform((params) => params.value.toUpperCase())
  name: string

  @IsString()
  @MaxLength(100)
  @Transform((params) => params.value.toUpperCase())
  description: string
}
