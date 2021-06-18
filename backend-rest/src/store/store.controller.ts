import { Body, Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    @ApiOperation({ summary: 'Create store' })
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storeService.create(createStoreDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all store' })
    findAll() {
        return this.storeService.findAll();
    }

    @Get(':name')
    @ApiOperation({ summary: 'Search store' })
    findOne(@Param('name') name: string) {
        return this.storeService.findOne(name);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete store' })
    remove(@Param('id') id: string) {
        return this.storeService.remove(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update store' })
    update(@Param('id') id: string, @Body() updateStoreDto: CreateStoreDto) {
        return this.storeService.update(id, updateStoreDto);
    }
    
}