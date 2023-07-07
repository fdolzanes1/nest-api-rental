import { PrismaClient } from '@prisma/client';

const categories = [
  {
    name: 'GM',
    description: 'GM'
  },
  {
    name: 'VW',
    description: 'VW'
  },
  {
    name: 'FIAT',
    description: 'FIAT'
  },
];

export class CategoriesSeed {
  public static async main(prisma: PrismaClient) {
    for (const category of categories) {
      try {
        await prisma.category.create({
          data: {
            name: category.name,
            description: category.description
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}