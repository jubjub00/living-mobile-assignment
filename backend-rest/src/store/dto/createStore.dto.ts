import { ApiProperty } from '@nestjs/swagger';

class CreateStoreDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    rating: number;
}
export {
    CreateStoreDto,
}
