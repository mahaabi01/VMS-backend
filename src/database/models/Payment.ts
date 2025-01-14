import { Table, Column, Model, DataType } from "sequelize-typescript";
import { PaymentMethod, PaymentStatus } from "../../types/orderTypes";

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
        "paid",
        "partialPaid",
        "unpaid"
      ]
    })
    declare paymentStatus: PaymentStatus;

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
