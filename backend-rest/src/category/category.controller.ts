import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Get(':name')
    @ApiOperation({ summary: 'Search category' })
    findOne(@Param('name') name: string) {
        return this.categoryService.findOne(name);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete category' })
    remove(@Param('id') id: string) {
        return this.categoryService.remove(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    update(@Param('id') id: string, @Body() updateStoreDto: CreateCategoryDto) {
        return this.categoryService.update(id, updateStoreDto);
    }
}
