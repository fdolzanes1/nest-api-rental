import { CreateSpecificationDto } from '../dto/create-specification.dto'
import { UpdateSpecificationDto } from '../dto/update-specification.dto'
import { SpecificationEntity } from '../entities/specification.entity'

export interface ISpecificationervice {
  findAll(): Promise<SpecificationEntity[]>
  findOne(id: number): Promise<SpecificationEntity>
  create(data: CreateSpecificationDto): Promise<SpecificationEntity>
  update(id: number, dataUpdate: UpdateSpecificationDto): Promise<SpecificationEntity>
  remove(id: number): Promise<boolean>
}
