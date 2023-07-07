import { Module, forwardRef } from '@nestjs/common'

import { PrismaModule } from '../../../infra/database/prisma/prisma.module'
import { SpecificationsController } from './specifications.controller'
import { SpecificationsService } from './specifications.service'
import { SpecificationsRepository } from './specifications.repository'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [SpecificationsController],
  providers: [SpecificationsService, SpecificationsRepository],
})
export class SpecificationsModule {}
