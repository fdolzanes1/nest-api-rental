import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { ISpecificationervice } from './interfaces/specification.service.interface'
import { SpecificationEntity } from './entities/specification.entity'
import { CreateSpecificationDto } from './dto/create-specification.dto'
import { UpdateSpecificationDto } from './dto/update-specification.dto'
import { SpecificationsRepository } from './specifications.repository'
import { SpecificationsErrors } from './errors/specifications.error'

@Injectable()
export class SpecificationsService implements ISpecificationervice {
  constructor(private readonly repository: SpecificationsRepository) {}

  async findAll(): Promise<SpecificationEntity[]> {
    return await this.repository.findAll()
  }

  async findOne(id: number): Promise<SpecificationEntity> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(SpecificationsErrors.SPECIFICATION_NOT_FOUND)
    return await this.repository.findOne(id)
  }

  async create(data: CreateSpecificationDto): Promise<SpecificationEntity> {
    const { name } = data
    const category = await this.findByName(name)
    if (!!category) throw new ConflictException(SpecificationsErrors.SPECIFICATION_ALREADY_EXISTS)
    return await this.repository.create(data)
  }

  async update(id: number, dataUpdate: UpdateSpecificationDto): Promise<SpecificationEntity> {
    const exists = await this.exists(id)
    const { name } = dataUpdate
    if (!exists) throw new NotFoundException(SpecificationsErrors.SPECIFICATION_NOT_FOUND)
    const category = await this.findByName(name)
    if (!!category) throw new ConflictException(SpecificationsErrors.SPECIFICATION_ALREADY_EXISTS)
    return await this.repository.update(id, dataUpdate)
  }

  async remove(id: number): Promise<boolean> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(SpecificationsErrors.SPECIFICATION_NOT_FOUND)
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

  private async findByName(name: string): Promise<SpecificationEntity> {
    return await this.repository.findByName(name)
  }
}
