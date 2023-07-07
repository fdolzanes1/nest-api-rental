import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';


const specifications = [
  {
    name: 'CLASS A',
    description: 'CLASS A'
  },
  {
    name: 'CLASS B',
    description: 'CLASS B'
  },
  {
    name: 'CLASS C',
    description: 'CLASS C'
  },
];

export class SpecificationsSeed {
  public static async main(prisma: PrismaClient) {
    for (const specification of specifications) {
      try {
        await prisma.specification.create({
          data: {
            name: specification.name,
            description: specification.description
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}
