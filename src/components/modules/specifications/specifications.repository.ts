import { PrismaService } from '../../../infra/database/prisma/prisma.service'

import { Injectable } from '@nestjs/common'
import { ISpecificationRepository } from './interfaces/specification.repository.interface'
import { SpecificationEntity } from './entities/specification.entity'
import { CreateSpecificationDto } from './dto/create-specification.dto'
import { UpdateSpecificationDto } from './dto/update-specification.dto'

@Injectable()
export class SpecificationsRepository implements ISpecificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SpecificationEntity[]> {
    try {
      return await this.prisma.specification.findMany({
        orderBy: {
          id: 'asc',
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: number): Promise<SpecificationEntity> {
    try {
      return await this.prisma.specification.findUnique({
        where: {
          id: Number(id),
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findByName(name: string): Promise<SpecificationEntity> {
    try {
      return await this.prisma.specification.findFirst({
        where: {
          name,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async create(data: CreateSpecificationDto): Promise<SpecificationEntity> {
    try {
      return await this.prisma.specification.create({
        data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: number, dataUpdate: UpdateSpecificationDto): Promise<SpecificationEntity> {
    try {
      return await this.prisma.specification.update({
        where: {
          id,
        },
        data: dataUpdate,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: number): Promise<SpecificationEntity> {
    try {
      return await this.prisma.specification.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async count(id: number): Promise<number> {
    try {
      const count = await this.prisma.specification.count({
        where: {
          id,
        },
      })
      return count
    } catch (error) {
      throw new Error(error)
    }
  }
}
