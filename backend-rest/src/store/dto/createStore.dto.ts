import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNumber, IsString, Length } from 'class-validator';

class CreateStoreDto {
    @IsString()
    @IsAlpha()
    @Length(5, 100)
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    rating: number;
}
export {
    CreateStoreDto,
}
