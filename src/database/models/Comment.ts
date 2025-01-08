import { Table, Column, Model, CreatedAt, BelongsTo } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Product from "./Product";
import User from "./User";

@Table({
  tableName: "comments",
  modelName: "Comment",
  timestamps: true,
})
class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;


  @Column({
    type: DataTypes.STRING,
  })
  declare comment: string;

  @Column({
    type: DataTypes.INTEGER,
  })
  declare rating: number


  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: Date;
}

export default Comment;
