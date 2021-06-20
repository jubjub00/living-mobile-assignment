import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create category' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The user has been successfully created.',
        type: CategoryDto,
    })
    @ApiBadRequestResponse({
        description: 'The create-category input is invalid.',
    })
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CategoryDto) {
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
    @ApiCreatedResponse({ 
        description: 'The user has been successfully created.',
        type: CategoryDto,
    })
    @ApiBadRequestResponse({
        description: 'The create-category input is invalid.',
    })
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() updateStoreDto: CategoryDto) {
        return this.categoryService.update(id, updateStoreDto);
    }
}
