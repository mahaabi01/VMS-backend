import { DataTypes } from "sequelize";
import { Table, Column, Model, CreatedAt, BelongsTo, UpdatedAt } from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";

@Table({
  tableName: "orderDEtails",
  modelName: "OrderDetail",
  timestamps: true,
})
class OrderDetail extends Model<OrderDetail> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;

  @Column({
    type : DataTypes.INTEGER
  })
  declare quantity : number

  @Column({
    type : DataTypes.DECIMAL
  })
  declare price : number

  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataTypes.DATE)
  declare updatedAt: Date;

  // //Relationship
  // @BelongsTo(()=>Order)
  // declare order: OrderDetail
  
  // @BelongsTo(()=>Product)
  // declare product: Product;
}

export default OrderDetail;
