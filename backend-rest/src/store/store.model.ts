import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'store',
})

class StoreModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;

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