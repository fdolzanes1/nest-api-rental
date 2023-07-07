import { Module, forwardRef } from '@nestjs/common'
import { PrismaModule } from '../../../infra/database/prisma/prisma.module'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { IsEmailUniqueConstraint } from './validations/users.validation'
import { AuthModule } from '../auth/auth.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, IsEmailUniqueConstraint, JwtService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
