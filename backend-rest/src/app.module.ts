import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModule } from './store/store.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
const config = require('../config.json')
@Module({
    imports: [
        SequelizeModule.forRoot({
        dialect: config.dialect,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        autoLoadModels: config.autoLoadModels,
        synchronize: config.synchronize,
        }),
        StoreModule,
        CategoryModule,
        MenuModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
