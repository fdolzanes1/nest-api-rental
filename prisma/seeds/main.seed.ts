import { PrismaClient } from "@prisma/client";
import { UsersSeed } from "./users.seed";
import { RolesSeed } from "./roles.seed";
import { PermissionsSeed } from "./permissions.seed";
import { PermissionsRolesSeed } from "./permissions-roles.seed";
import { CategoriesSeed } from "./categories.seed";
import { SpecificationsSeed } from "./specifications.seed";
import { CarsSeed } from "./cars.seed";

const createData = new PrismaClient();

async function main() {
  await RolesSeed.main(createData)
  await UsersSeed.main(createData)
  await PermissionsSeed.main(createData)
  await PermissionsRolesSeed.main(createData)
  await CategoriesSeed.main(createData)
  await SpecificationsSeed.main(createData)
  await CarsSeed.main(createData)
}
main();