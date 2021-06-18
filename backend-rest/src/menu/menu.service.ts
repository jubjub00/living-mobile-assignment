import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MenuModel } from './menu.model';
import { CreateMenuDto } from './dto/createMenu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuModel)
    private menuRepo: typeof MenuModel, 
  ) {}

  create(menu: CreateMenuDto) {
      return this.menuRepo.create(menu);
  }

  findAll() {
      return this.menuRepo.findAll();
  }
}