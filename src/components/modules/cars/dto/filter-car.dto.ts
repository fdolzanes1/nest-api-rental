import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CarFilterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform((params) => params.value.toUpperCase())
  name?: string

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  categoryId?: number

  @ApiProperty()
  @IsArray()
  @IsOptional()
  specifications?: []
}
