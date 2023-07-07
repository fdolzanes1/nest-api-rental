import { PrismaService } from '../../../infra/database/prisma/prisma.service'
import { CreateCarDto } from './dto/create-car.dto'
import { CarFilterDto } from './dto/filter-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'
import { CarEntity } from './entities/car.entity'
import { ICarRepository } from './interfaces/car.repository.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CarsRepository implements ICarRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CarEntity[]> {
    try {
      return await this.prisma.car.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
              status: true,
            },
          },
          specifications: {
            select: {
              specification: true,
            },
          },
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: number): Promise<CarEntity> {
    try {
      return await this.prisma.car.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
              status: true,
            },
          },
          specifications: {
            select: {
              specification: true,
            },
          },
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async getCarsByCategory(categoryId: number): Promise<CarEntity[]> {
    try {
      return await this.prisma.car.findMany({
        where: {
          categoryId: categoryId,
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
              description: true,
              status: true,
            },
          },
          specifications: {
            select: {
              specification: true,
            },
          },
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAllByFilters(filters: CarFilterDto): Promise<CarEntity[]> {
    const cars = await this.prisma.car.findMany({
      where: {
        AND: [
          filters.name ? { name: { contains: filters.name } } : {},
          filters.categoryId ? { categoryId: Number(filters.categoryId) } : {},
          filters.specifications?.length > 0
            ? {
                specifications: {
                  some: {
                    specification: {
                      id: {
                        in: filters.specifications.map((spec) => Number(spec)),
                      },
                    },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
          },
        },
        specifications: {
          select: {
            specification: true,
          },
        },
      },
    })
    return cars
  }

  async findByName(name: string): Promise<CarEntity> {
    try {
      return await this.prisma.car.findFirst({
        where: {
          name,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async create(data: CreateCarDto): Promise<CarEntity> {
    try {
      return await this.prisma.car.create({
        data: {
          name: data.name,
          description: data.description,
          dailyRate: data.dailyRate,
          available: true,
          licensePlate: data.licensePlate,
          fineAmount: data.fineAmount,
          brand: data.brand,
          categoryId: data.categoryId,
          specifications: {
            create: data.specification.map((specification) => {
              return {
                specification: {
                  connect: { id: specification.id },
                },
              }
            }),
          },
        },
        include: {
          category: true,
          specifications: true,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: number, dataUpdate: UpdateCarDto): Promise<CarEntity> {
    try {
      await this.prisma.carsSpecifications.deleteMany({
        where: { carId: id },
      })

      return await this.prisma.car.update({
        where: {
          id,
        },
        data: {
          name: dataUpdate.name,
          description: dataUpdate.description,
          dailyRate: dataUpdate.dailyRate,
          available: dataUpdate.available,
          licensePlate: dataUpdate.licensePlate,
          fineAmount: dataUpdate.fineAmount,
          brand: dataUpdate.brand,
          categoryId: dataUpdate.categoryId,
          specifications: {
            create: dataUpdate.specification.map((specification) => {
              return {
                specification: {
                  connect: { id: specification.id },
                },
              }
            }),
          },
        },
        include: {
          category: true,
          specifications: true,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: number): Promise<CarEntity> {
    try {
      return await this.prisma.car.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async count(id: number): Promise<number> {
    try {
      const count = await this.prisma.car.count({
        where: {
          id,
        },
      })
      return count
    } catch (error) {
      throw new Error(error)
    }
  }
}
