import { ApiProperty } from '@nestjs/swagger';

class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    storeId: string;
}
export {
    CreateCategoryDto,
}
