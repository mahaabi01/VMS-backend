import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Order from "../database/models/Order";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";
import User from "../database/models/User";
import { OrderData, PaymentMethod, PaymentStatus } from "../types/orderTypes";
import OrderDetail from "../database/models/OrderDetail";
import Payment from "../database/models/Payment";
import CreditLedger from "../database/models/CreditLedger";
import axios from "axios";

interface OrderRequest extends Request {
  user?: {
    id: string;
  };
}

class OrderController {
  //create Order
  //  async createOrder(req: AuthRequest, res: Response): Promise<void> {
  //     const userId = req.user?.id;
  //     const {
  //       paymentStatus,
  //       paymentMethod,
  //       orderStatus,
  //       isCredit,
  //       paidAmount,
  //     }: OrderData = req.body;
  //     if (!paymentStatus || !paymentMethod || !orderStatus || !paidAmount) {
  //       res.status(400).json({
  //         message:
  //           "Please provide paymentStatus, paymentMethod, orderStatus, paidAmount",
  //       });
  //     } else {
  //       //finding cart list of that user
  //       const cartItem = await Cart.findAll({
  //         where: {
  //           userId,
  //         },
  //         include: [
  //           {
  //             model: Product,
  //             attributes: ["id", "name", "price"],
  //           },
  //         ],
  //       });
  //       //total price calculation
  //       let totalAmount = 0;
  //       for (const item in cartItem) {
  //         totalAmount =
  //           totalAmount +
  //           cartItem[item].dataValues.quantity *
  //             cartItem[item].dataValues.Product.dataValues.price;
  //       }
  //       if (paidAmount < 0 || paidAmount > totalAmount) {
  //         res.status(404).json({
  //           message: "Payment failed. Not statisfied required amount.",
  //         });
  //       }

  //       let khaltiResponse;

  //       let remainingAmount = totalAmount - paidAmount;
  //       let orderItems = await Order.create({
  //         totalAmount,
  //         paymentStatus,
  //         paymentMethod,
  //         orderStatus,
  //         isCredit,
  //         paidAmount,
  //         remainingAmount,
  //         userId,
  //       });
  //       //for payment
  //       if (paymentMethod == PaymentMethod.khalti) {
  //         const data = {
  //           return_url: "http://localhost:5173/",
  //           website_url: "http://localhost:5173",
  //           amount: totalAmount * 100,
  //           puchase_order_id: orderItems.id,
  //           purchase_order_name: "order_" + orderItems.id,
  //         };
  //         const response = await axios.post(
  //           "https://dev.khalti.com/api/v2/epayment/initiate",
  //           data,
  //           {
  //             headers: {
  //               Authorization: "Key a2244ce4ea304d1bb9d63019247921ac",
  //             },
  //           }
  //         );
  //         khaltiResponse = response.data;
  //         const paymentData = await Payment.create({
  //           amount: paidAmount,
  //           paymentStatus,
  //           paymentMethod,
  //           isPartial:
  //             remainingAmount === 0 && remainingAmount < totalAmount
  //               ? false
  //               : true,
  //           orderId: orderItems.dataValues.id,
  //           pidx: khaltiResponse.pidx,
  //           paymentDate: Date.now(),
  //         });
  //       }
  //       //create OrderDetail table
  //       for (var i = 0; i < cartItem.length; i++) {
  //         await OrderDetail.create({
  //           quantity: cartItem[i].quantity,
  //           price: cartItem[i].dataValues.Product.dataValues.price,
  //           productId: cartItem[i].dataValues.Product.dataValues.id,
  //           orderId: orderItems.dataValues.id,
  //         });
  //       }
  //       if (isCredit === true) {
  //         await CreditLedger.create({
  //           total_credit: totalAmount,
  //           paidAmount,
  //           remainingAmount,
  //           lastPaymentDate: Date.now(),
  //           dueDate: Date.now(),
  //           paymentHistory: remainingAmount === 0 ? "paid" : "remaining",
  //           userId,
  //           orderId: orderItems.dataValues.id,
  //         });
  //       }
  //       //delete cart list
  //       await Cart.destroy({
  //         where: {
  //           userId,
  //         },
  //       });
  //       if (paymentMethod == PaymentMethod.khalti) {
  //         res.status(200).json({
  //           message: "Order placed succesfully.",
  //           data: khaltiResponse.payment_url,
  //         });
  //       } else {
  //         res.status(200).json({
  //           message: "Order placed succesfully with COD.",
  //         });
  //       }
  //     }
  //   }

  async createOrder(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      console.log("User ID:", userId);
      const {
        paymentStatus,
        paymentMethod,
        orderStatus,
        isCredit,
        paidAmount,
      }: OrderData = req.body;

      if (!paymentStatus || !paymentMethod || !orderStatus || !paidAmount) {
        res.status(400).json({
          message:
            "Please provide paymentStatus, paymentMethod, orderStatus, paidAmount",
        });
      }

      // Fetch user's cart items
      const cartItem = await Cart.findAll({
        where: { userId },
        include: [{ model: Product, attributes: ["id", "name", "price"] }],
      });

      // Calculate total amount
      let totalAmount = 0;
      for (const item of cartItem) {
        totalAmount +=
          item.dataValues.quantity * item.dataValues.Product.dataValues.price;
      }

      if (paidAmount < 0 || paidAmount > totalAmount) {
        res.status(400).json({
          message: "Payment failed. Amount not within valid range.",
        });
      }

      let khaltiResponse;
      let remainingAmount = totalAmount - paidAmount;

      // Create order entry
      const orderItems = await Order.create({
        totalAmount,
        paymentStatus,
        paymentMethod,
        orderStatus,
        isCredit,
        paidAmount,
        remainingAmount,
        userId,
      });
      console.log("Order Details:", orderItems);

      // Handle Khalti payment
      if (paymentMethod === PaymentMethod.khalti) {
        const data = {
          return_url: "http://localhost:5173/",
          website_url: "http://localhost:5173",
          amount: totalAmount * 100,
          purchase_order_id: orderItems.id,
          purchase_order_name: "order_" + orderItems.id,
        };

        const response = await axios.post(
          "https://a.khalti.com/api/v2/epayment/initiate",
          data,
          {
            headers: { Authorization: "Key ff63703d37934a2c96563e907dfbe534" },
          }
        );

        khaltiResponse = response.data;

        // Store payment details
        await Payment.create({
          amount: paidAmount,
          paymentStatus,
          paymentMethod,
          isPartial: remainingAmount > 0,
          orderId: orderItems.dataValues.id,
          pidx: khaltiResponse.pidx,
          paymentDate: new Date(),
        });
      }

      // Create order details
      for (const item of cartItem) {
        await OrderDetail.create({
          quantity: item.dataValues.quantity,
          price: item.dataValues.Product.dataValues.price,
          productId: item.dataValues.Product.dataValues.id,
          orderId: orderItems.dataValues.id,
        });
      }

      // If order is on credit, update CreditLedger
      if (isCredit) {
        await CreditLedger.create({
          total_credit: totalAmount,
          paidAmount,
          remainingAmount,
          lastPaymentDate: new Date(),
          dueDate: new Date(),
          paymentHistory: remainingAmount === 0 ? "paid" : "remaining",
          userId,
          orderId: orderItems.dataValues.id,
        });
      }

      // Clear user's cart
      await Cart.destroy({ where: { userId } });

      // Send response
      if (paymentMethod === PaymentMethod.khalti) {
        res.status(200).json({
          message: "Order placed successfully.",
          data: khaltiResponse.payment_url,
        });
      } else {
        res.status(200).json({
          message: "Order placed successfully with COD.",
        });
      }
    } catch (error) {
      console.error("Error in createOrder:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //verify transaction
  async verifyTransaction(req: OrderRequest, res: Response): Promise<void> {
    const { pidx } = req.body;
    if (!pidx) {
      res.status(400).json({
        message: "Please provide pidx.",
      });
      return;
    }
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup",
      {
        pidx: pidx,
      },
      {
        headers: {
          Authorization: "Key a2244ce4ea304d1bb9d63019247921ac",
        },
      }
    );
    const data = response.data;
    if (data.status === "Completed") {
      await Payment.update(
        {
          PaymentStatus: PaymentStatus.Paid,
        },
        {
          where: {
            pidx: pidx,
          },
        }
      );
      res.status(200).json({
        message: "Payment verified succesfully.",
      });
    } else if (data.status === "Expired") {
      res.status(400).json({
        message: "Payment not suceed ,Payment time out.",
      });
    } else if (data.status === "Cancelled") {
      res.status(400).json({
        message: "Payment not suceed ,Cancelled",
      });
    } else {
      res.status(200).json({
        message: "Payment not verified succesfully.",
      });
    }
  }

  //get order by userId
  async getMyOrders(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const data = await Order.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "name"],
        },
      ],
    })
    if(!data){
      res.status(404).json({
        message: "No order found for this user."
      })
    }
    else{
      res.status(200).json({
        message: "Order fetched succesfully.",
        data,
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
