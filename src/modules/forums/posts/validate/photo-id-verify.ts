import { PhotoEntity } from '@modules/photos/entities/photo.entity'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { getManager } from 'typeorm'

@ValidatorConstraint({ async: true })
export class CheckPhotoIdNotFound implements ValidatorConstraintInterface {
  async validate(value: any) {
    const result = getManager()
      .count(PhotoEntity, { id: value })
      .then((count) => {
        return count > 0
      })
    return result
  }
}

export function PhotoIdVerify(validationOptions?: ValidationOptions) {
  validationOptions = {
    ...validationOptions
  }
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckPhotoIdNotFound
    })
  }
}
