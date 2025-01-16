import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Order from "../database/models/Order";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";
import User from "../database/models/User";
import { OrderData } from "../types/orderTypes";
import OrderDetail from "../database/models/OrderDetail";
import Payment from "../database/models/Payment";
import CreditLedger from "../database/models/CreditLedger";

class OrderController {
  //create Order
  async createOrder(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { paymentStatus, paymentMethod, orderStatus, isCredit, paidAmount }: OrderData =
      req.body;
    if (!paymentStatus || !paymentMethod || !orderStatus || !paidAmount) {
      res.status(400).json({
        message:
          "Please provide paymentStatus, paymentMethod, orderStatus, paidAmount",
      });
    } else {
      //finding cart list of that user
      const cartItem = await Cart.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
          },
        ],
      });
      //total price calculation
      let totalAmount = 0;
      for (const item in cartItem) {
        totalAmount =
          totalAmount +
          cartItem[item].dataValues.quantity *
            cartItem[item].dataValues.Product.dataValues.price;
      }
      if(paidAmount < 0 || paidAmount > totalAmount){
        res.status(404).json({
          message: "Payment failed. Not statisfied required amount."
        })
      }
      let remainingAmount = totalAmount - paidAmount;
      let orderItems = await Order.create({
        totalAmount,
        paymentStatus,
        paymentMethod,
        orderStatus,
        isCredit,
        paidAmount,
        remainingAmount,
        userId,
      });
      await Payment.create({
        paymentMethod,
        paymentStatus,
        amount: paidAmount,
        paymentData: Date.now(),
        isPartial: (remainingAmount === 0 && remainingAmount < totalAmount) ? false : true,
        orderId: orderItems.dataValues.id
      })
      for(var i = 0; i<cartItem.length; i++){
        await OrderDetail.create({
          quantity: cartItem[i].quantity,
          price: cartItem[i].dataValues.Product.dataValues.price,
          productId: cartItem[i].dataValues.Product.dataValues.id,
          orderId: orderItems.dataValues.id
        })
      }
      if(isCredit === true){
        await CreditLedger.create({
          total_credit : totalAmount,
          paidAmount,
          remainingAmount,
          lastPaymentDate : Date.now(),
          dueDate : Date.now(),
          paymentHistory: remainingAmount  === 0 ? "paid": "remaining",
          userId,
          orderId:orderItems.dataValues.id
        })
      }
      //delete cart list
      await Cart.destroy({
        where:{
          userId
        }
      })
      res.status(200).json({
        message: "Order placed succesfully.",
      });
    }
  }

  //get order by Id
  async getOrderById(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const id = req.params.id;
    const data = await Order.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "phone", "address"],
        },
      ],
    });
    if (!data) {
      res.status(404).json({
        message: "No order with that id.",
      });
    } else {
      res.status(200).json({
        message: "Order fetched succesfully.",
        data,
      });
    }
  }

  //get all Orders
  async getAllOrders(req: AuthRequest, res: Response): Promise<void> {
    const data = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "name"],
        },
      ],
    });
    res.status(200).json({
      message: "Order fetched succesfully.",
      data,
    });
  }

  //update orderstatus
  async updateorderstatus(req: AuthRequest, res: Response): Promise<void> {
    const { orderId: id } = req.params;
    console.log(id);
    const { orderStatus } = req.body;
    const existingOrder = await Order.findByPk(id);

    if (!existingOrder) {
      res.status(404).json({
        message: "No order with that ID.",
      });
      return;
    }
    try {
      await Order.update(
        {
          ...(orderStatus && { orderStatus }),
        },
        {
          where: { id },
        }
      );

      res.status(200).json({
        message: "Order status updated succesfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while updating the order Status.",
      });
    }
  }

  //delete order
  async deleteorder(req: AuthRequest, res: Response): Promise<void> {
    const { orderId } = req.params;
    const order = await Order.findAll({
      where: {
        id: orderId,
      },
    });
    if (order.length > 0) {
      await Order.destroy({
        where: {
          id: orderId,
        },
      });
      res.status(200).json({
        message: "Order deleted succesfully.",
      });
    } else {
      res.status(404).json({
        message: "No order found for deletion.",
      });
    }
  }
}

export default new OrderController();
