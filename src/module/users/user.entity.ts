import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string;

    @Column({
        type: DataType.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataType.NOW
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: DataType.NOW
    })
    updatedAt: Date;

}
