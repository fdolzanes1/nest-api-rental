import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryEntity } from './entities/category.entity'
import { CategoriesRepository } from './categories.repository'
import { ICategoryService } from './interfaces/category.service.interface'
import { CategoriesErrors } from './errors/categories.error'

@Injectable()
export class CategoriesService implements ICategoryService {
  constructor(private readonly repository: CategoriesRepository) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.repository.findAll()
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(CategoriesErrors.CATEGORY_NOT_FOUND)
    return await this.repository.findOne(id)
  }

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    const { name } = data
    const category = await this.findByName(name)
    if (!!category) throw new ConflictException(CategoriesErrors.CATEGORY_ALREADY_EXISTS)
    return await this.repository.create(data)
  }

  async update(id: number, dataUpdate: UpdateCategoryDto): Promise<CategoryEntity> {
    const exists = await this.exists(id)
    const { name } = dataUpdate
    if (!exists) throw new NotFoundException(CategoriesErrors.CATEGORY_NOT_FOUND)
    const category = await this.findByName(name)
    if (!!category) throw new ConflictException(CategoriesErrors.CATEGORY_ALREADY_EXISTS)
    return await this.repository.update(id, dataUpdate)
  }

  async remove(id: number): Promise<boolean> {
    const exists = await this.exists(id)
    if (!exists) throw new NotFoundException(CategoriesErrors.CATEGORY_NOT_FOUND)
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

  private async findByName(name: string): Promise<CategoryEntity> {
    return await this.repository.findByName(name)
  }
}
