import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName : 'carts',
  modelName : 'Cart',
  timestamps : true
})

class Cart extends Model<Cart>{
  @Column({
    primaryKey :true,
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  })
  declare id: string;

  @Column({
    type : DataTypes.INTEGER,
    allowNull : false
  })
  declare quantity : number
}

export default Cart