import { PrismaClient } from '@prisma/client';

const permissions = [
  {
    name: 'CREATE_CARS',
    method: 'POST',
    path: 'CREATE',
    module: 'CARS'
  },
  {
    name: 'GET_CARS',
    method: 'GET',
    path: 'VIEW',
    module: 'CARS'
  },
  {
    name: 'UPDATE_CARS',
    method: 'PUT',
    path: 'UPDATE',
    module: 'CARS'
  },
  {
    name: 'DELETE_CARS',
    method: 'DELETE',
    path: 'DELETE',
    module: 'CARS'
  },
  {
    name: 'GET_USERS',
    method: 'GET',
    path: 'VIEW',
    module: 'USERS'
  },
  {
    name: 'UPDATE_USERS',
    method: 'PUT',
    path: 'UPDATE',
    module: 'USERS'
  },
  {
    name: 'DELETE_USERS',
    method: 'DELETE',
    path: 'DELETE',
    module: 'USERS'
  },
  {
    name: 'CREATE_CATEGORIES',
    method: 'POST',
    path: 'CREATE',
    module: 'CATEGORIES'
  },
  {
    name: 'GET_CATEGORIES',
    method: 'GET',
    path: 'VIEW',
    module: 'CATEGORIES'
  },
  {
    name: 'UPDATE_CATEGORIES',
    method: 'PUT',
    path: 'UPDATE',
    module: 'CATEGORIES'
  },
  {
    name: 'DELETE_CATEGORIES',
    method: 'DELETE',
    path: 'DELETE',
    module: 'CATEGORIES'
  },
  {
    name: 'CREATE_SPECIFICATIONS',
    method: 'POST',
    path: 'CREATE',
    module: 'SPECIFICATIONS'
  },
  {
    name: 'GET_SPECIFICATIONS',
    method: 'GET',
    path: 'VIEW',
    module: 'SPECIFICATIONS'
  },
  {
    name: 'UPDATE_SPECIFICATIONS',
    method: 'PUT',
    path: 'UPDATE',
    module: 'SPECIFICATIONS'
  },
  {
    name: 'DELETE_SPECIFICATIONS',
    method: 'DELETE',
    path: 'DELETE',
    module: 'SPECIFICATIONS'
  },
];

export class PermissionsSeed {
  public static async main(prisma: PrismaClient) {
    for (const permission of permissions) {
      try {
        await prisma.permission.create({
          data: {
            name: permission.name,
            method: permission.method,
            path: permission.path,
            module: permission.module
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}
