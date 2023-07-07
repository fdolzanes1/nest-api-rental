import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { AuthResetDTO } from './dto/auth-reset.dto'
import { AuthForgetDTO } from './dto/auth-forget.dto'
import { AuthGuards } from '../../shared/guards/auth.guard'

import { User } from './../../shared/decorators/user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data)
  }

  @Post('login')
  async login(@Body() data: AuthLoginDTO) {
    return this.authService.login(data)
  }

  @Post('forget')
  async forget(@Body() data: AuthForgetDTO) {
    return this.authService.forget(data)
  }

  @Post('reset')
  async reset(@Body() data: AuthResetDTO) {
    return this.authService.reset(data)
  }

  @Post('verify')
  async verify(@Headers('authorization') token) {
    const formattedToken = (token ?? '').split(' ')[1]
    return this.authService.verifyToken(formattedToken)
  }

  @UseGuards(AuthGuards)
  @Post('verify-guard')
  async me(@User() user) {
    return { user }
  }
}
