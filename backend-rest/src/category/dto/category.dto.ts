import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

class CategoryDto {

    @IsString()
    @Length(5, 100)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    storeId: string;
}
export {
    CategoryDto,
}
