import { Table, Column, Model, BelongsTo } from "sequelize-typescript";
import Product from "./Product";
import User from "./User";
import { DataTypes } from "sequelize";

@Table({
  tableName: "wishlists",
  modelName: "WishList",
  timestamps: true,
})
class Wishlist extends Model<Wishlist> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;


  @Column({
    type: DataTypes.STRING
  })
  declare productName: string;
  
  @Column({
    type: DataTypes.DATE,
  })
  declare createdAt: Date
}

export default Wishlist;
