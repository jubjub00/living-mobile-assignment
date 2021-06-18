import { Body, Controller, Get, Post } from '@nestjs/common';
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
}