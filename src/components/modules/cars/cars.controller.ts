import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common'
import { ICarController } from './interfaces/car.controller.interface'
import { CarEntity } from './entities/car.entity'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'
import { CarsService } from './cars.service'
import { CarFilterDto } from './dto/filter-car.dto'
import PermissionGuard from 'src/components/shared/guards/permission.guard'
import { CarsPermissions } from 'src/components/shared/permissions/car.permission'
import { AuthGuards } from 'src/components/shared/guards/auth.guard'
import { RoleGuards } from 'src/components/shared/guards/role.guard'

@UseGuards(AuthGuards, RoleGuards)
@Controller('cars')
export class CarsController implements ICarController {
  constructor(private readonly service: CarsService) {}

  async findAll(): Promise<CarEntity[]> {
    return await this.service.findAll()
  }

  @UseGuards(PermissionGuard(CarsPermissions.view))
  @Get()
  async findAllByFilters(@Query() query: CarFilterDto): Promise<CarEntity[]> {
    return await this.service.findAllByFilters(query)
  }

  @UseGuards(PermissionGuard(CarsPermissions.view))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CarEntity> {
    return await this.service.findOne(id)
  }

  @UseGuards(PermissionGuard(CarsPermissions.view))
  @Get('categories/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number): Promise<CarEntity[]> {
    return await this.service.findByCategory(categoryId)
  }

  @UseGuards(PermissionGuard(CarsPermissions.create))
  @Post()
  async create(@Body() data: CreateCarDto): Promise<CarEntity> {
    return await this.service.create(data)
  }

  @Put(':id')
  @UseGuards(PermissionGuard(CarsPermissions.update))
  update(@Param('id') id: number, @Body() dataUpdate: UpdateCarDto): Promise<CarEntity> {
    return this.service.update(id, dataUpdate)
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(CarsPermissions.delete))
  remove(@Param('id') id: number): Promise<boolean> {
    return this.service.remove(id)
  }
}
