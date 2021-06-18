import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuModel } from './menu.model';

@Module({
    imports: [SequelizeModule.forFeature([MenuModel])],
    exports: [SequelizeModule],
})
export class MenuModule {}