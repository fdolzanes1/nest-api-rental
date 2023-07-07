import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './infra/database/prisma/prisma.module'
import { CategoriesModule } from './components/modules/categories/categories.module'
import { CarsModule } from './components/modules/cars/cars.module'
import { SpecificationsModule } from './components/modules/specifications/specifications.module'
import { UsersModule } from './components/modules/users/users.module'
import { AuthModule } from './components/modules/auth/auth.module'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.prod', '.env'],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PrismaModule,
    CategoriesModule,
    SpecificationsModule,
    forwardRef(() => CarsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
