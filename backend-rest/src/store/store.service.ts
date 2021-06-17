import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StoreModel } from './store.model';
import { CreateStoreDto } from './dto/createStore.dto';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel(StoreModel) 
    private storeRepo: typeof StoreModel, 
  ) {}

  create(store: CreateStoreDto) {
      return this.storeRepo.create(store);
  }

  findAll() {
      return this.storeRepo.findAll();
  }
    
  findOne(name: string): Promise<StoreModel> {
    return this.storeRepo.findOne({
      where: {name:name}
    });
  }

  update(id: string, updateUserInput: CreateStoreDto) {
    return this.storeRepo.update(updateUserInput,{
        where: {id:id}
      });
  }

  async remove(id: string): Promise<void> {
    await this.storeRepo.destroy({
        where: {id:id}
      });
  }
}