import { Column, Model, Table, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { MenuModel } from '../menu/menu.model';
import { StoreModel } from '../store/store.model';
@Table({
    tableName: 'category',
})
export class CategoryModel extends Model {
    
    
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    id: string;

    @ForeignKey(() => StoreModel)
    storeId: string;

    @HasMany(() => MenuModel)
    category: CategoryModel[];

    @Column
    name: string;
    
}