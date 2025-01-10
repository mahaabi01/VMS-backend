import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "creditLedgers",
  modelName: "CreditLedger",
  timestamps: true,
})
class CreditLedger extends Model{
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare total_credit: number;

  @Column({
    type: DataType.FLOAT,
  })
  declare paidAmount: number;

  @Column({
    type: DataType.FLOAT,
  })
  declare remainingAmount: number;

  @Column({
    type: DataType.DATE,
  })
  declare lastPaymentDate: Date;

  @Column({
    type: DataType.DATE,
  })
  declare dueDate: Date;

  @Column({
    type: DataType.STRING,
  })
  declare paymentHistory: string;
}

export default CreditLedger;
