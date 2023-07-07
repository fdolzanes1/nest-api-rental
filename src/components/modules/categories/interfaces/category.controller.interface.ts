import { CreateCategoryDto } from '../dto/create-category.dto'
import { UpdateCategoryDto } from '../dto/update-category.dto'
import { CategoryEntity } from '../entities/category.entity'

export interface ICategoryController {
  findAll(): Promise<CategoryEntity[]>
  findOne(id: number): Promise<CategoryEntity>
  create(data: CreateCategoryDto): Promise<CategoryEntity>
  update(id: number, dataUpdate: UpdateCategoryDto): Promise<CategoryEntity>
  remove(id: number): Promise<boolean>
}
