import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from '../../modules/auth/auth.service'
import { UsersService } from '../../modules/users/users.service'

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    try {
      const token = (authorization ?? '').split(' ')[1]
      const data = this.authService.verifyToken(token)

      request.tokenPayload = data

      request.user = await this.userService.findOne(data.id)

      return true
    } catch (e) {
      return false
    }
  }
}
