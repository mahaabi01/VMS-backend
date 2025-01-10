import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "orderDEtails",
  modelName: "OrderDetail",
  timestamps: true,
})
class OrderDetail extends Model<OrderDetail> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare price: number;
}

export default OrderDetail;
