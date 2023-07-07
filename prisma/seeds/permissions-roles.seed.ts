import { PrismaClient } from '@prisma/client';

export class PermissionsRolesSeed {
  public static async main(prisma: PrismaClient) {
    
    const permissionsRoles = [
      {
        roleId: 1,
        permissionId: 1
      },
      {
        roleId: 1,
        permissionId: 2
      },
      {
        roleId: 1,
        permissionId: 3
      },
      {
        roleId: 1,
        permissionId: 4
      },
      {
        roleId: 1,
        permissionId: 5
      },
      {
        roleId: 1,
        permissionId: 6
      },
      {
        roleId: 1,
        permissionId: 7
      },
      {
        roleId: 1,
        permissionId: 8
      },
      {
        roleId: 1,
        permissionId: 9
      },
      {
        roleId: 1,
        permissionId: 10
      },
      {
        roleId: 1,
        permissionId: 11
      },
      {
        roleId: 1,
        permissionId: 12
      },
      {
        roleId: 1,
        permissionId: 13
      },
      {
        roleId: 1,
        permissionId: 14
      },
      {
        roleId: 1,
        permissionId: 15
      },
      {
        roleId: 2,
        permissionId: 1
      },
      {
        roleId: 2,
        permissionId: 2
      },
      {
        roleId: 2,
        permissionId: 3
      },
      {
        roleId: 2,
        permissionId: 4
      },
      {
        roleId: 3,
        permissionId: 8
      },
      {
        roleId: 3,
        permissionId: 9
      },
      {
        roleId: 3,
        permissionId: 10
      },
      {
        roleId: 3,
        permissionId: 11
      }     
    ]

    try {
      await prisma.permissionRole.createMany({
        data: permissionsRoles
      });
    } catch (error) {
      throw new Error(error);
    }
    
  }
}
