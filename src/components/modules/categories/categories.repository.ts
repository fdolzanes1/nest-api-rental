import { PrismaService } from '../../../infra/database/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryEntity } from './entities/category.entity'
import { ICategoryRepository } from './interfaces/category.repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CategoriesRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoryEntity[]> {
    try {
      return await this.prisma.category.findMany({
        orderBy: {
          id: 'asc',
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: number): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.findUnique({
        where: {
          id: Number(id),
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findByName(name: string): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.findFirst({
        where: {
          name,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.create({
        data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: number, dataUpdate: UpdateCategoryDto): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: dataUpdate,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: number): Promise<CategoryEntity> {
    try {
      return await this.prisma.category.delete({
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
      const count = await this.prisma.category.count({
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
