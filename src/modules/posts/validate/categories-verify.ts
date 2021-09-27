import { CategoryEntity } from '@modules/categories/entities/category.entity'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { getManager } from 'typeorm'

@ValidatorConstraint({ async: true })
export class CheckCategoriesNotFound implements ValidatorConstraintInterface {
  async validate(value: any) {
    const result = await getManager().findByIds(CategoryEntity, value)
    if (result.length > 0 && result.length === value?.length) return true
    return false
  }
}

export function CategoriesVerify(validationOptions?: ValidationOptions) {
  validationOptions = {
    ...validationOptions
  }
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckCategoriesNotFound
    })
  }
}
