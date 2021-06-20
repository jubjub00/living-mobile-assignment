import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { MenuDto } from './dto/menu.dto';
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    @ApiOperation({ summary: 'Create menu' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The menu has been successfully created.',
        type: MenuDto,
    })
    @ApiBadRequestResponse({
        description: 'The create-menu input is invalid.',
    })
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: MenuDto) {
        return this.menuService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all menu' })
    findAll() {
        return this.menuService.findAll();
    }

    @Get(':name')
    @ApiOperation({ summary: 'Search menu' })
    findOne(@Param('name') name: string) {
        return this.menuService.findOne(name);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete menu' })
    remove(@Param('id') id: string) {
        return this.menuService.remove(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update menu' })
    @ApiBadRequestResponse({
        description: 'The update-menu input is invalid.',
    })
    @ApiCreatedResponse({ 
        description: 'The menu has been successfully updated.',
        type: MenuDto,
    })
    update(@Param('id') id: string, @Body() updateStoreDto: MenuDto) {
        return this.menuService.update(id, updateStoreDto);
    }
}