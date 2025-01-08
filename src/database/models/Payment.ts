import { Table, Column, Model, CreatedAt, UpdatedAt, BelongsTo} from "sequelize-typescript";
import Order from "./Order";
import { DataTypes } from "sequelize";

@Table({
  tableName: "payments",
  modelName: "Payment",
  timestamps: true,
})
class Payment extends Model<Payment> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare paymentMethod: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare paymentStatus: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare transactionId: string;

  @Column({
    type: DataTypes.DECIMAL,
  })
  declare amount: number;

  @Column({
    type: DataTypes.DATE,
  })
  declare paymentDate: Date;

  @Column({
    type: DataTypes.BOOLEAN,
  })
  declare isPartial: boolean;

  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataTypes.DATE)
  declare updatedAt: Date;

  // //relationship
  // @BelongsTo(()=>Order)
  // declare order: Order;
}

export default Payment;
