import { PaginationResponseDto } from '@common/dtos'
import { CommonException } from '@common/exceptions'
import { MessageResponse } from '@common/interceptors/message.response'
import { PaginationRequest } from '@common/interfaces'
import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { unlink } from 'fs/promises'
import { Pagination } from 'src/helpers'
import { QueryRequest } from 'src/helpers/query.request'
import { ErrorType } from 'src/interfaces/enums'
import { ErrorMessage } from 'src/interfaces/enums/error-message.enum'
import { MessageSuccesses } from 'src/interfaces/message.success'
import { DeletePhotoRequestDto } from './dtos/delete-photo.request.dto'
import { PhotoEntity } from './entities/photo.entity'
import { UploadMapper } from './photo.mapper'
import { PhotoRepository } from './photo.repository'

@Injectable()
export class UploadService {
  constructor(private photoRepository: PhotoRepository) { }

  async uploadFile(file: Express.Multer.File): Promise<PhotoEntity> {
    try {
      const filename = file?.filename || ''
      const photo = UploadMapper.toCreateEntity(filename)
      await this.photoRepository.save(photo)

      return photo
    } catch (error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  readFile(fileId: string, res: Response) {
    res.sendFile(fileId, { root: 'files' }, (error) => {
      if (error) {
        return res.end()
      }
    })
  }

  async list(pagination: PaginationRequest<QueryRequest>): Promise<PaginationResponseDto<PhotoEntity>> {
    try {
      const [list, count] = await this.photoRepository.getPhotosAndCount(
        pagination
      )
      return Pagination.of<PhotoEntity>(pagination, count, list)
    } catch (_error) {
      throw new CommonException(
        ErrorType.INTERNAL_SERVER,
        ErrorMessage.INTERNAL_SERVER
      )
    }
  }

  async delete(request: DeletePhotoRequestDto): Promise<MessageResponse> {
    try {
      await unlink(`files/${request.filename}`)
      await this.photoRepository.delete({ name: request.filename })
      return { message: MessageSuccesses.DELETE_SUCCESS }
    } catch (_error) {
      return new CommonException(ErrorType.NOT_FOUND, ErrorMessage.NOT_FOUND)
    }
  }
}
