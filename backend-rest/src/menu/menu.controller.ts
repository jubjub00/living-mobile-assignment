import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiOperation } from '@nestjs/swagger';
@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    @ApiOperation({ summary: 'Create menu' })
    create(@Body() createUserDto: CreateMenuDto) {
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
    update(@Param('id') id: string, @Body() updateStoreDto: CreateMenuDto) {
        return this.menuService.update(id, updateStoreDto);
    }
}