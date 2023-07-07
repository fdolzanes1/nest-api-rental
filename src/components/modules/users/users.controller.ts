import { Controller, Get, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RoleGuards } from 'src/components/shared/guards/role.guard'
import { AuthGuards } from 'src/components/shared/guards/auth.guard'
import PermissionGuard from 'src/components/shared/guards/permission.guard'
import { UsersPermissions } from 'src/components/shared/permissions/user.permission'

@UseGuards(AuthGuards, RoleGuards)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@Roles(Role.Admin)
  @UseGuards(PermissionGuard(UsersPermissions.view))
  @Get()
  async getAll() {
    const users = await this.usersService.findAll()
    return users
  }

  //@Roles(Role.Admin)
  @UseGuards(PermissionGuard(UsersPermissions.view))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  //@Roles(Role.Admin)
  @UseGuards(PermissionGuard(UsersPermissions.update))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  //@Roles(Role.Admin)
  @UseGuards(PermissionGuard(UsersPermissions.delete))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
