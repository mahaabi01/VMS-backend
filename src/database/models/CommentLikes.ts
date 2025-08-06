import { Table, Column, Model, DataType } from "sequelize-typescript"

@Table({
  tableName: "commentLikes",
  modelName: "CommentLikes",
  timestamps: true,
})
class CommentLikes extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

}

export default CommentLikes;