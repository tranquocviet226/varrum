import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { PaginationRequest } from '@common/interfaces'
import { PhotoRepository } from '@modules/photos/photo.repository'
import { Injectable } from '@nestjs/common'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { CategoryMapper } from './category.mapper'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { DeleteCategoryDto } from './dtos/delete-category.dto'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { CategoryEntity } from './entities/category.entity'
import { CategoryRepository } from './repositories/category.repository'

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private photoRepository: PhotoRepository
  ) {}

  async findAll(
    pagination: PaginationRequest<QueryRequest>
  ): Promise<PaginationResponseDto<CategoryEntity>> {
    try {
      const [list, count] = await this.categoryRepository.getDataAndCount(
        pagination
      )
      return Pagination.of<CategoryEntity>(pagination, count, list)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  async create(createDto: CreateCategoryDto) {
    const photoEntity = await this.photoRepository.findOne({
      id: createDto.photo_id
    })
    if (createDto.photo_id && !photoEntity)
      throw new CommonException(
        ErrorType.IMAGE_NOT_FOUND,
        ErrorMessage.IMAGE_NOT_FOUND
      )

    try {
      let category = CategoryMapper.toCreateEntity(createDto)
      category = await this.categoryRepository.save(category)
      return CategoryMapper.toDto(category)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  async update(updateDto: UpdateCategoryDto) {
    let category = await this.categoryRepository.findOne({ id: updateDto.id })
    if (!category)
      throw new CommonException(
        ErrorType.ID_NOT_FOUND,
        ErrorMessage.ID_NOT_FOUND
      )
    const photoEntity = await this.photoRepository.findOne({
      id: updateDto.photo_id
    })
    if (updateDto.photo_id && !photoEntity)
      throw new CommonException(
        ErrorType.IMAGE_NOT_FOUND,
        ErrorMessage.IMAGE_NOT_FOUND
      )
    try {
      category = CategoryMapper.toUpdateEntity(category, updateDto)
      const result = await this.categoryRepository.save(category)
      return CategoryMapper.toDto(result)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  async delete(deleteDto: DeleteCategoryDto) {
    try {
      const result = await this.categoryRepository.delete(deleteDto.id)
      return result
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }
}
