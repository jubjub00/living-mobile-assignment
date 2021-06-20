import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

class MenuDto {

    @IsString()
    @Length(5, 100)
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsString()
    @ApiProperty()
    categoryId: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    price: number;
}
export {
    MenuDto,
}
