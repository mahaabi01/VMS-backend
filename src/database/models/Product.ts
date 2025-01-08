import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript'
import OrderDetail from './OrderDetail';
import Comment from './Comment';
import Wishlist from './Wishlist';
import { DataTypes } from 'sequelize';

@Table({
  tableName : 'products',
  modelName : 'Product',
  timestamps : true
})

class Product extends Model<Product>{
  @Column({
    primaryKey : true,
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  })
  declare id : string;

  @Column({
    type : DataTypes.STRING,
    allowNull : false
  })
  declare name : string

  @Column({
    type : DataTypes.TEXT
  })
  declare description : string

  @Column({
    type : DataTypes.DECIMAL,
    allowNull : false,
  })
  declare price : number

  @Column({
    type : DataTypes.STRING
  })
  declare category : string

  @Column({
    type : DataTypes.INTEGER,
    allowNull : false,
  })
  declare stock : number

  @Column({
    type : DataTypes.STRING
  })
  declare imageUrl : string

  @CreatedAt
  @Column({
    type : DataTypes.DATE
  })
  declare cretedAt: Date

  @UpdatedAt
  @Column({
    type : DataTypes.DATE
  })
  declare updatedAt: Date

  // //  Relationships
  // @HasMany(()=>OrderDetail)
  // declare orderDetails: OrderDetail[];

  // @HasMany(()=>Comment)
  // declare comments: Comment[];

  // @HasMany(()=>Wishlist)
  // declare wishlists: Wishlist[];

}

export default Product