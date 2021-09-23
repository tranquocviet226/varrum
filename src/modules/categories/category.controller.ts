import { PaginationParams } from '@common/decorators';
import { PaginationResponseDto } from '@common/dtos';
import { PaginationRequest } from '@common/interfaces';
import { JwtAuthGuard, Permissions, PermissionsGuard } from '@modules/auths';
import { Body, Controller, Delete, Get, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryRequest } from 'src/helpers/query.request';
import { EPermissions } from 'src/interfaces/enums/permissions.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { DeleteCategoryDto } from './dtos/delete-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('Category Controller')
@Controller('categories')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) { }

    @ApiQuery({
        name: 'condition',
        required: false,
        description: 'categories.id = 1'
    })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'orderBy', required: false, description: 'categories.created_at' })
    @ApiQuery({
        name: 'orderDirection',
        required: false,
        description: 'ASC || DESC'
    })
    @ApiQuery({ name: 'search', required: false })
    @Get()
    list(@PaginationParams() pagination: PaginationRequest<QueryRequest>): Promise<PaginationResponseDto<CategoryEntity>> {
        return this.categoryService.findAll(pagination)
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(EPermissions.ADMIN_ACCESS_CREATE_CATEGORY)
    @Post()
    create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }

    // @UseGuards(JwtAuthGuard, PermissionsGuard)
    // @Permissions(EPermissions.ADMIN_ACCESS_UPDATE_CATEGORY)
    @Patch()
    update(@Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(updateCategoryDto)
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions(EPermissions.ADMIN_ACCESS_DELETE_CATEGORY)
    @Delete()
    delete(@Body(ValidationPipe) deleteCategoryDto: DeleteCategoryDto) {
        return this.categoryService.delete(deleteCategoryDto)
    }
}
