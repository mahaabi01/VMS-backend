import { DataTypes } from "sequelize";
import { Table, Column, Model, BelongsTo } from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "creditLedgers",
  modelName: "CreditLedger",
  timestamps: true,
})
class CreditLedger extends Model<CreditLedger> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataTypes.FLOAT,
  })
  declare total_credit: number;

  @Column({
    type: DataTypes.FLOAT,
  })
  declare paidAmount: number;

  @Column({
    type: DataTypes.FLOAT,
  })
  declare remainingAmount: number;

  @Column({
    type: DataTypes.DATE,
  })
  declare lastPaymentDate: Date;

  @Column({
    type: DataTypes.DATE,
  })
  declare dueDate: Date;

  @Column({
    type: DataTypes.STRING,
  })
  declare paymentHistory: string;

  // //relationship
  // @BelongsTo(()=>User)
  // declare user: User;
}

export default CreditLedger;
