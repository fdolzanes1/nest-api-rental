import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaModule } from 'src/infra/database/prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    PrismaModule, 
    PassportModule, 
    JwtModule.register({ secret: '1234567890@' }), 
    forwardRef(() => UsersModule)
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
