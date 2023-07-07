import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersErrors } from '../users/errors/users.error'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { AuthForgetDTO } from './dto/auth-forget.dto'
import { AuthResetDTO } from './dto/auth-reset.dto'
import { UsersService } from '../users/users.service'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

  async register(data: CreateUserDto) {
    const emailExists = await this.userService.findEmail(data.email)
    if (!!emailExists) throw new ConflictException(UsersErrors.EMAIL_ALREADY_EXISTS)

    const hashedPassword = await bcrypt.hash(data.password, await bcrypt.genSalt())

    const createdUser = await this.userService.create({
      ...data,
      password: hashedPassword,
    })

    delete createdUser.password

    return this.createTokenJwt(createdUser)
  }

  createTokenJwt(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '1 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'user',
        }
      ),
    }
  }

  verifyToken(data: string) {
    try {
      return this.jwtService.verify(data, {
        audience: 'user',
        issuer: 'login',
      })
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async login(data: AuthLoginDTO) {
    const user = await this.getAuthenticatedUser(data.email, data.password)
    return this.createTokenJwt(user)
  }

  async forget(data: AuthForgetDTO) {
    const user = await this.userService.findEmail(data.email)
    if (!user) throw new BadRequestException(UsersErrors.USER_NOT_FOUND)

    // TODO: Enviar o e-mail

    return true
  }

  async reset(data: AuthResetDTO) {
    const user = await this.userService.updatePassword(data.id, data.password)
    return user
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.userService.findEmail(email)
    if (!user) throw new BadRequestException(UsersErrors.USER_NOT_FOUND)

    await this.verifyPassword(plainTextPassword, user.password)

    user.password = undefined

    return user
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword)

    if (!isPasswordMatching) {
      throw new BadRequestException(UsersErrors.USER_CREDENTIALS_PROVIDED)
    }
  }
}
