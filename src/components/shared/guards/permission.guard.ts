import { Injectable, CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common'
import PermissionType from '../types/permission.type'
import { UsersService } from '../../modules/users/users.service'

const PermissionGuard = (permission: PermissionType): Type<CanActivate> => {
  @Injectable()
  class PermissionGuardMixin {
    constructor(private readonly userService: UsersService) {}

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const userPermission = await this.userService.getPermission(user.roleId)

      return userPermission.includes(permission)
    }
  }
  return mixin(PermissionGuardMixin)
}

export default PermissionGuard
