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
}