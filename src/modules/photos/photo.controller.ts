import { PaginationParams } from '@common/decorators'
import { PaginationResponseDto } from '@common/dtos'
import { MessageResponse } from '@common/interceptors/message.response'
import { PaginationRequest } from '@common/interfaces'
import { JwtAuthGuard, PermissionsGuard, TOKEN_NAME } from '@modules/auths'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger'
import { randomUUID } from 'crypto'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { QueryRequest } from 'src/helpers/query.request'
import { DeletePhotoRequestDto } from './dtos/delete-photo.request.dto'
import { PhotoEntity } from './entities/photo.entity'
import { UploadService } from './photo.service'

@ApiTags('Upload Controller')
@ApiBearerAuth(TOKEN_NAME)
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) { }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (_req, file, cb) => {
          const randomName = randomUUID()
          cb(null, `${randomName}${extname(file?.originalname)}`)
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file)
  }

  @Get('files/:fileId')
  get(@Param('fileId') fileId, @Res() res) {
    return this.uploadService.readFile(fileId, res)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiQuery({
    name: 'condition',
    required: false,
    description: 'photos.id = 1'
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'orderBy', required: false, description: 'photos.id' })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'ASC || DESC'
  })
  @ApiQuery({ name: 'search', required: false })
  @Get('files')
  list(@PaginationParams() pagination: PaginationRequest<QueryRequest>): Promise<PaginationResponseDto<PhotoEntity>> {
    return this.uploadService.list(pagination)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('files')
  delete(@Body() request: DeletePhotoRequestDto): Promise<MessageResponse> {
    return this.uploadService.delete(request)
  }
}
