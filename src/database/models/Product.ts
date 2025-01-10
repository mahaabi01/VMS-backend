import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "products",
  modelName: "Product",
  timestamps: true,
})
class Product extends Model<Product> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.ENUM,
    values: [
      "electronics",
      "clothing",
      "grocery",
      "furniture",
      "beauty",
      "toys",
      "stationery",
      "sports",
      "homeAppliances",
    ],
    allowNull: false,
  })
  declare category: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare stock: number;

  @Column({
    type: DataType.STRING,
  })
  declare imageUrl: string;
}

export default Product;
