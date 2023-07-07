import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../infra/database/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data,
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async getAllUsers() {
    return await this.prisma.user.findMany()
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { rentals: true },
    })
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async updatePassword(id: number, password: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { password },
    })
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    })
  }

  async checkIfEmailExists(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async findById(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    })
  }

  async getUserPermission(roleId: number) {
    return await this.prisma.user.findFirst({
      where: {
        roleId: roleId,
      },
      include: {
        roles: {
          include: {
            permissionRoles: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    })
  }
}
