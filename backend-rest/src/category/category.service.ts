import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private categoryRepo: typeof CategoryModel, 
  ) {}

  create(type: CreateCategoryDto) {
      return this.categoryRepo.create(type);
  }

  findAll() {
      return this.categoryRepo.findAll();
  }

  findOne(name: string): Promise<CategoryModel> {
    return this.categoryRepo.findOne({
      where: {name:name}
    });
  }

  update(id: string, updateUserInput: CreateCategoryDto) {
    return this.categoryRepo.update(updateUserInput,{
        where: {id:id}
      });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepo.destroy({
        where: {id:id}
      });
  }
}