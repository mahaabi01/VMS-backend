import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "wishlists",
  modelName: "WishList",
  timestamps: true,
})
class Wishlist extends Model<Wishlist> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare productName: string;

  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;
}

export default Wishlist;
