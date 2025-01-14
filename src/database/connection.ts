import { Sequelize } from "sequelize-typescript";
import User from "./models/User";
import Product from "./models/Product";
import Comment from "./models/Comment";
import Wishlist from "./models/Wishlist";
import CreditLedger from "./models/CreditLedger";
import OrderDetail from "./models/OrderDetail";
import Order from "./models/Order";
import Payment from "./models/Payment";
import Cart from "./models/Cart";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database is connected !!");
  })
  .catch((err) => {
    console.log(err);
  });

//Relationships
//user and comments - One to Many
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

//user and wishlist - One to Many
User.hasMany(Wishlist, { foreignKey: "userId" });
Wishlist.belongsTo(User, { foreignKey: "userId" });

//User and CreditLedger - One to Many
User.hasMany(CreditLedger, { foreignKey: "userId" });
CreditLedger.belongsTo(User, { foreignKey: "userId" });

//Product and OrderDetails - One to Many
Product.hasMany(OrderDetail, { foreignKey: "productId" });
OrderDetail.belongsTo(Product, { foreignKey: "productId" });

//Product and User - One to Many
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

//Product and Comments - One to Many
Product.hasMany(Comment, { foreignKey: "productId" });
Comment.belongsTo(Product, { foreignKey: "productId" });

//Product and Wishlists - One to Many
// Product.hasMany(Wishlist, {foreignKey: 'productId'});
// Wishlist.belongsTo(Product, { foreignKey:'productId'})

//Payment and Order - One to Many (partial payment case)
Order.hasMany(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

//credit ledger and user relationship - One to One relationship
User.hasOne(CreditLedger, { foreignKey: "userId" });
CreditLedger.belongsTo(User, { foreignKey: "userId" });

//Order and User - One to Many
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

//Order and OrderDetails - One to Many
Order.hasMany(OrderDetail, { foreignKey: "orderId" });
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

//Order and CreditLedger -
Order.hasMany(CreditLedger, { foreignKey: "orderId" });
CreditLedger.belongsTo(Order, { foreignKey: "orderId" });

//User and Cart - One to Many
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

//Product and Cart - One to Manuy
Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

sequelize.sync({ force: false, alter:false }).then(() => {
  console.log("DB migrated !");
});

export default sequelize;
