import { IsBoolean, IsString, MaxLength } from 'class-validator'

export class UpdateCategoryDto {
  @IsString()
  @MaxLength(50)
  name: string

  @IsString()
  @MaxLength(100)
  description: string

  @IsBoolean()
  status: boolean
}
