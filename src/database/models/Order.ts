import { Table, Column, Model, DataType } from "sequelize-typescript";
import { OrderData, orderStatus, PaymentMethod, PaymentStatus } from "../../types/orderTypes";

@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true,
})
class Order extends Model{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.DECIMAL,
  })
  declare totalAmount: number;

  @Column({
    type: DataType.ENUM,
    values: [
      "paid",
      "partialPaid",
      "unpaid"
    ]
  })
  declare paymentStatus: PaymentStatus;

  @Column({
    type: DataType.ENUM,
    values: [
      "cod",
      "khalti"
    ]
  })
  declare paymentMethod: PaymentMethod;

  @Column({
    type: DataType.ENUM,
    values: [
      "placed",
      "shipped",
      "delivered",
      "completed"
    ]
  })
  declare orderStatus: orderStatus;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare isCredit: boolean;

  @Column({
    type: DataType.DATE,
  })
  declare dueDate: Date;

  @Column({
    type: DataType.DECIMAL,
  })
  declare paidAmount: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare remainingAmount: number;
}

export default Order;
