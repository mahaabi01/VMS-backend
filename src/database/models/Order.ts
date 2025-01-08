import { Table, Column, Model, BelongsTo, HasMany } from "sequelize-typescript";
import User from "./User";
import Payment from "./Payment";
import OrderDetail from "./OrderDetail";
import { DataTypes } from "sequelize";

@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true,
})
class Order extends Model<Order> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataTypes.DECIMAL,
  })
  declare totalAmount: number;

  @Column({
    type: DataTypes.STRING,
  })
  declare paymentStatus: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare paymentMethod: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare orderStatus: string;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  declare isCredit: boolean;

  @Column({
    type: DataTypes.DATE,
  })
  declare dueDate: Date;

  @Column({
    type: DataTypes.DECIMAL,
  })
  declare paidAmount: number;

  @Column({
    type: DataTypes.DECIMAL,
  })
  declare remainingAmount: number;



  // //Relationships
  // @BelongsTo(()=>User)
  // declare user:User;

  // @HasMany(()=>OrderDetail)
  // declare orderDetails: OrderDetail[];

  // @HasMany(()=>Payment)
  // declare payments: Payment[];
}

export default Order;
