import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


const roles = [
  {
    name: 'ADMIN',
  },
  {
    name: 'BR CARS',
  },
  {
    name: 'BR CATEGORIES',
  },
];

export class RolesSeed {
  public static async main(prisma: PrismaClient) {
    for (const role of roles) {
      try {
        await prisma.role.create({
          data: {
            name: role.name
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}
