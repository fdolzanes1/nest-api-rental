import { SetMetadata } from '@nestjs/common'
import { Role } from '../permissions/role.enum'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)
