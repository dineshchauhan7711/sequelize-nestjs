import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from "./user.entity";
@Table
export class UserSession extends Model<UserSession> {
     @Column({
          type: DataType.BIGINT,
          allowNull: false
     })
     id?: number;

     @Column({
          type: DataType.STRING,
          allowNull: false,
     })
     token: string;

     @ForeignKey(() => User)
     @Column({
          type: DataType.BIGINT,
          allowNull: false,
     })
     user_id: number;

     @BelongsTo(() => User)
     user: User;

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
