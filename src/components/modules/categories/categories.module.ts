import { Module, forwardRef } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { CategoriesRepository } from './categories.repository'
import { PrismaModule } from '../../../infra/database/prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
