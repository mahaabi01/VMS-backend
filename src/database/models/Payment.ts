import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "payments",
  modelName: "Payment",
  timestamps: true,
})
class Payment extends Model{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.STRING,
  })
  declare paymentStatus: string;

  @Column({
    type: DataType.STRING,
  })
  declare transactionId: string;

  @Column({
    type: DataType.DECIMAL,
  })
  declare amount: number;

  @Column({
    type: DataType.DATE,
  })
  declare paymentDate: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare isPartial: boolean;
}

export default Payment;
