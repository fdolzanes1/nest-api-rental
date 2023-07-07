import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'
import { ISpecificationController } from './interfaces/specification.controller.interface'
import { SpecificationEntity } from './entities/specification.entity'
import { CreateSpecificationDto } from './dto/create-specification.dto'
import { UpdateSpecificationDto } from './dto/update-specification.dto'
import { SpecificationsService } from './specifications.service'
import { AuthGuards } from 'src/components/shared/guards/auth.guard'
import { SpecificationsPermissions } from 'src/components/shared/permissions/specification.permission'
import PermissionGuard from 'src/components/shared/guards/permission.guard'

@UseGuards(AuthGuards)
@ApiTags('specifications')
@Controller('specifications')
export class SpecificationsController implements ISpecificationController {
  constructor(private readonly service: SpecificationsService) {}

  @UseGuards(PermissionGuard(SpecificationsPermissions.view))
  @Get()
  async findAll(): Promise<SpecificationEntity[]> {
    return await this.service.findAll()
  }

  @UseGuards(PermissionGuard(SpecificationsPermissions.view))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SpecificationEntity> {
    return await this.service.findOne(id)
  }

  @UseGuards(PermissionGuard(SpecificationsPermissions.create))
  @Post()
  async create(@Body() data: CreateSpecificationDto): Promise<SpecificationEntity> {
    return await this.service.create(data)
  }

  @UseGuards(PermissionGuard(SpecificationsPermissions.update))
  @Put(':id')
  update(@Param('id') id: number, @Body() dataUpdate: UpdateSpecificationDto): Promise<SpecificationEntity> {
    return this.service.update(id, dataUpdate)
  }

  @UseGuards(PermissionGuard(SpecificationsPermissions.delete))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.service.remove(id)
  }
}
