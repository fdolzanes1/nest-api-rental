import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ICarService } from './interfaces/car.service.interface'
import { CarsRepository } from './cars.repository'
import { CarEntity } from './entities/car.entity'
import { CarsErrors } from './errors/cars.error'
import { UpdateCarDto } from './dto/update-car.dto'
import { CreateCarDto } from './dto/create-car.dto'
import { CarFilterDto } from './dto/filter-car.dto'

@Injectable()
export class CarsService implements ICarService {
  constructor(private readonly repository: CarsRepository) {}

  async findAll(): Promise<CarEntity[]> {
    return await this.repository.findAll()
  }

  async findOne(id: number): Promise<CarEntity> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(CarsErrors.CAR_NOT_FOUND)
    return await this.repository.findOne(id)
  }

  async findByCategory(categoryId: number): Promise<CarEntity[]> {
    //const exists = await this.exists(id)
    //if (!exists) throw new NotFoundException(CarsErrors.CAR_NOT_FOUND)
    return await this.repository.getCarsByCategory(categoryId)
  }

  async findAllByFilters(filters: CarFilterDto): Promise<CarEntity[]> {
    //const exists = await this.exists(id)
    //if (!exists) throw new NotFoundException(CarsErrors.CAR_NOT_FOUND)
    return await this.repository.findAllByFilters(filters)
  }

  async create(data: CreateCarDto): Promise<CarEntity> {
    const { name } = data
    const category = await this.findByName(name)
    if (!!category) throw new ConflictException(CarsErrors.CAR_ALREADY_EXISTS)
    return await this.repository.create(data)
  }

  async update(id: number, dataUpdate: UpdateCarDto): Promise<CarEntity> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(CarsErrors.CAR_NOT_FOUND)
    return await this.repository.update(id, dataUpdate)
  }

  async remove(id: number): Promise<boolean> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(CarsErrors.CAR_NOT_FOUND)
    const result = await this.repository.remove(id)
    if (result) {
      return true
    }
    return false
  }

  private async exists(id: number): Promise<boolean> {
    const count = await this.repository.count(id)
    if (count <= 0) return false
    return true
  }

  private async findByName(name: string): Promise<CarEntity> {
    return await this.repository.findByName(name)
  }
}
