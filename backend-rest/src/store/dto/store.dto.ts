import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

class StoreDto {

    @IsString()
    @Length(5, 100)
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    rating: number;
}
export {
    StoreDto,
}
