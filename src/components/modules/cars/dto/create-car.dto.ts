import { IsArray, IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'

class Specification {
  @IsNumber()
  id: number
}

export class CreateCarDto {
  @IsString()
  @MaxLength(50)
  @Transform((params) => params.value.toUpperCase())
  name: string

  @IsString()
  @MaxLength(100)
  @Transform((params) => params.value.toUpperCase())
  description: string

  @IsNumber()
  dailyRate: number

  @IsBoolean()
  available: boolean

  @IsString()
  @Transform((params) => params.value.toUpperCase())
  licensePlate: string

  @IsNumber()
  fineAmount: number

  @IsString()
  @Transform((params) => params.value.toUpperCase())
  brand: string

  @IsNumber()
  categoryId: number

  @IsArray()
  specification: Specification[]
}
