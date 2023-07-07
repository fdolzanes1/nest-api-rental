import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const user = {
  name: 'Fabiano Dolzanes',
  password: '123456',
  email: 'fdolzanes1@gmail.com',
  driverLicense: faker.lorem.slug(),
  avatar: faker.internet.avatar(),
  roleId: 1
}

export class UsersSeed {
  public static async main(prisma: PrismaClient) {
    
    const hashedPassword = await bcrypt.hash('123456', await bcrypt.genSalt())

    try {
      await prisma.user.create({
        data: {
          name: user.name,
          password: hashedPassword,
          email: user.email,
          driverLicense: user.driverLicense,
          avatar: user.avatar,
          roleId: user.roleId,
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
