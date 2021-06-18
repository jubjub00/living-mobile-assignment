import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { CategoryModel } from '../category/category.model';
@Table({
    tableName: 'store',
})
class StoreModel extends Model {
    
    @Column({
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    id: string;

    @HasMany(() => CategoryModel)
    store: StoreModel[];

    @Column
    name: string;
    
    @Column
    description: string;

    @Column
    rating: number;
}

export {
    StoreModel,
}