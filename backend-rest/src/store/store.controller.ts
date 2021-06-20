import { Body, Controller, Get, Post, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { StoreDto } from './dto/store.dto';
import { plainToClass } from 'class-transformer';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    
    @Post()
    @ApiOperation({ summary: 'Create store' })
    @ApiBadRequestResponse({
        description: 'The create-user input is invalid.',
    })
    @ApiCreatedResponse({ 
        description: 'The user has been successfully created.',
        type: StoreDto,
    })
    @UsePipes(new ValidationPipe())
    async create(@Body() createStoreDto: StoreDto) {
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
    @ApiBadRequestResponse({
        description: 'The update-store input is invalid.',
    })
    @ApiCreatedResponse({ 
        description: 'The store has been successfully updated.',
        type: StoreDto,
    })
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() updateStoreDto: StoreDto) {
        return this.storeService.update(id, updateStoreDto);
    }
    
}