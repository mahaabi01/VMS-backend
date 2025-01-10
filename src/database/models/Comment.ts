import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "comments",
  modelName: "Comment",
  timestamps: true,
})
class Comment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare comment: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare rating: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare likes: number;
}

export default Comment;
