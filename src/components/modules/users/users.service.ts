import { ConflictException, Injectable } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './users.repository'
import { UsersErrors } from './errors/users.error'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll() {
    const users = await this.userRepository.getAllUsers()
    return users
  }

  async findOne(id: number) {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) throw new ConflictException(UsersErrors.USER_NOT_FOUND)

    return await this.userRepository.getUserById(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) throw new ConflictException(UsersErrors.USER_NOT_FOUND)

    const emailExists = await this.userRepository.checkIfEmailExists(updateUserDto.email)
    if (!!emailExists) throw new ConflictException(UsersErrors.EMAIL_ALREADY_EXISTS)

    return this.userRepository.updateUser(id, updateUserDto)
  }

  async updatePassword(id: number, password: string) {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) throw new ConflictException(UsersErrors.USER_NOT_FOUND)

    return this.userRepository.updatePassword(id, password)
  }

  async remove(id: number) {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) throw new ConflictException(UsersErrors.USER_NOT_FOUND)

    return await this.userRepository.deleteUser(id)
  }

  async findEmail(email: string) {
    return await this.userRepository.checkIfEmailExists(email)
  }

  async create(data: CreateUserDto) {
    return await this.userRepository.createUser(data)
  }

  public async getPermission(roleId: number) {
    const data = await this.userRepository.getUserPermission(roleId)
    const formatted = this.formatPayloadPermission(data)
    return formatted
  }

  public async formatPayloadPermission(data) {
    const formattedPermission = data.roles.permissionRoles.map((value) => value.permission.name)

    return formattedPermission
  }
}
