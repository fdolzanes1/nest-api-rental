import { CreateSpecificationDto } from '../dto/create-specification.dto'
import { UpdateSpecificationDto } from '../dto/update-specification.dto'
import { SpecificationEntity } from '../entities/specification.entity'

export interface ISpecificationRepository {
  findAll(): Promise<SpecificationEntity[]>
  findOne(id: number): Promise<SpecificationEntity>
  findByName(name: string): Promise<SpecificationEntity>
  create(data: CreateSpecificationDto): Promise<SpecificationEntity>
  update(id: number, dataUpdate: UpdateSpecificationDto): Promise<SpecificationEntity>
  remove(id: number): Promise<SpecificationEntity>
  count(id: number): Promise<number>
}
