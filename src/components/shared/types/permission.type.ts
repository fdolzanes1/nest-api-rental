import { CarsPermissions } from '../permissions/car.permission'
import { CategoriesPermissions } from '../permissions/category.permission'
import { SpecificationsPermissions } from '../permissions/specification.permission'
import { UsersPermissions } from '../permissions/user.permission'

const PermissionType = {
  ...CarsPermissions,
  ...UsersPermissions,
  ...CategoriesPermissions,
  ...SpecificationsPermissions,
}

type PermissionType = CarsPermissions | UsersPermissions | CategoriesPermissions | SpecificationsPermissions

export default PermissionType
