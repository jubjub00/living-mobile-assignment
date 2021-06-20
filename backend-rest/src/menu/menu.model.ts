import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CategoryModel } from '../category/category.model';

@Table({
    tableName: 'menu',
})
export class MenuModel extends Model {
    
    @ForeignKey(() => CategoryModel)
    categoryId: string;

    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID
    })
    id: string;

    @Column
    name: string;

    @Column
    price: number;
}