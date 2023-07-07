import { CreateCarDto } from '../dto/create-car.dto'
import { UpdateCarDto } from '../dto/update-car.dto'
import { CarEntity } from '../entities/car.entity'

export interface ICarService {
  findAll(): Promise<CarEntity[]>
  findOne(id: number): Promise<CarEntity>
  create(data: CreateCarDto): Promise<CarEntity>
  update(id: number, dataUpdate: UpdateCarDto): Promise<CarEntity>
  remove(id: number): Promise<boolean>
}
