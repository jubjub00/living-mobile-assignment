import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create category' })
    create(@Body() createUserDto: CreateCategoryDto) {
        return this.categoryService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all category' })
    findAll() {
        return this.categoryService.findAll();
    }
}
