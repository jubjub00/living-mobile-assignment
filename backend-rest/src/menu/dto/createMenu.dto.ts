import { ApiProperty } from '@nestjs/swagger';

class CreateMenuDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    price: number;
}
export {
    CreateMenuDto,
}
