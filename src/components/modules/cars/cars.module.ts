import { Module, forwardRef } from '@nestjs/common'
import { PrismaModule } from '../../../infra/database/prisma/prisma.module'
import { CarsController } from './cars.controller'
import { CarsService } from './cars.service'
import { CarsRepository } from './cars.repository'
import { AuthModule } from '../auth/auth.module'
import { JwtService } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository, JwtService],
})
export class CarsModule {}
