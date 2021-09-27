import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { getManager } from 'typeorm'
import { PostEntity } from '../entities/post.entity'

@ValidatorConstraint({ async: true })
export class CheckIdNotFound implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const result = getManager()
      .count(PostEntity, { [args.property]: value })
      .then((count) => {
        return count > 0
      })
    return result
  }
}

export function IdVerify(validationOptions?: ValidationOptions) {
  validationOptions = {
    ...validationOptions
  }
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckIdNotFound
    })
  }
}
