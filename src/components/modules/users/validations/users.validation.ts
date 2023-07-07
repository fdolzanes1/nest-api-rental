import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../users.repository'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UsersRepository) {}

  async validate(email: string): Promise<any> {
    // const emailExists = this.userRepository.checkIfEmailExists(email)
  }

  defaultMessage(args: ValidationArguments): string {
    return `O e-mail ${args.value} já está em uso.`
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
      async: true,
    })
  }
}
