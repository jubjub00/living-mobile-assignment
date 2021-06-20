import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

class MenuDto {

    @IsString()
    @Length(5, 100)
    @ApiProperty()
    @IsNotEmpty()
    name: string;

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
