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

  findOne(name: string): Promise<MenuModel> {
    return this.menuRepo.findOne({
      where: {name:name}
    });
  }

  update(id: string, updateUserInput: CreateMenuDto) {
    return this.menuRepo.update(updateUserInput,{
        where: {id:id}
      });
  }

  async remove(id: string): Promise<void> {
    await this.menuRepo.destroy({
        where: {id:id}
      });
  }
}