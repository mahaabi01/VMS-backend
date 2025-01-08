import { Table, Column, Model, CreatedAt, HasMany } from "sequelize-typescript";
import Order from "./Order";
import Comment from "./Comment";
import Wishlist from "./Wishlist";
import CreditLedger from "./CreditLedger";
import { DataTypes } from "sequelize";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  })
  declare email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [10, 10],
        msg: "Phone number must be 10 digits",
      },
    },
  })
  declare phone: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare address: string;

  @CreatedAt
  @Column({
    type: DataTypes.DATE,
  })
  declare createdAt: Date;

  // //Relationships 
  // // A user can have many Orders
  // @HasMany(()=>Order)
  // declare orders: Order[];

  // //A user can make many comments
  // @HasMany(()=>Comment)
  // declare comments: Comment[];

  // //A user can have multiple wishlist items
  // @HasMany(()=>Wishlist)
  // declare wishlist:Wishlist[];

  // //A user can have multiple credit ledger entries
  // @HasMany(()=>CreditLedger)
  // declare creditLedgers:CreditLedger[];
}

export default User;
