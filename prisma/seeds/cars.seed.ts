import { PrismaClient } from '@prisma/client';

const cars = [
  {
    name: 'GM',
    description: 'GM',
    dailyRate: 250,
    available: true,
    licensePlate: 'ABC-1234',
    fineAmount: 5,
    brand: 'GNA',
    categoryId: 1,
    specification: [
      {
        id: 1
      },
      {
        id: 2
      },
    ]
  },
  
];

export class CarsSeed {
  public static async main(prisma: PrismaClient) {
    for (const car of cars) {
      try {
        await prisma.car.create({
          data: {
            name: car.name,
            description: car.description,
            dailyRate: car.dailyRate,
            available: car.available,
            licensePlate: car.licensePlate,
            fineAmount: car.fineAmount,
            brand: car.brand,
            categoryId: car.categoryId,
            specifications: {
              create: car.specification.map((specification) => {
                return {
                  specification: {
                    connect: { id: specification.id },
                  },
                }
              }),
            },
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}