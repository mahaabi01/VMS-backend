import { Table, Column, Model, DataType } from "sequelize-typescript";

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
    type: DataType.STRING,
  })
  declare paymentStatus: string;

  @Column({
    type: DataType.STRING,
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.STRING,
  })
  declare orderStatus: string;

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
