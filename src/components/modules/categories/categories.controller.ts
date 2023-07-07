import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ICategoryController } from './interfaces/category.controller.interface'
import { CategoryEntity } from './entities/category.entity'
import { ApiTags } from '@nestjs/swagger'
import PermissionGuard from 'src/components/shared/guards/permission.guard'
import { CategoriesPermissions } from 'src/components/shared/permissions/category.permission'
import { AuthGuards } from 'src/components/shared/guards/auth.guard'

@UseGuards(AuthGuards)
@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements ICategoryController {
  constructor(private readonly service: CategoriesService) {}

  @UseGuards(PermissionGuard(CategoriesPermissions.view))
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return await this.service.findAll()
  }

  @UseGuards(PermissionGuard(CategoriesPermissions.view))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return await this.service.findOne(id)
  }

  @UseGuards(PermissionGuard(CategoriesPermissions.create))
  @Post()
  async create(@Body() data: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.service.create(data)
  }

  @UseGuards(PermissionGuard(CategoriesPermissions.update))
  @Put(':id')
  update(@Param('id') id: number, @Body() dataUpdate: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.service.update(id, dataUpdate)
  }

  @UseGuards(PermissionGuard(CategoriesPermissions.delete))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.service.remove(id)
  }
}
