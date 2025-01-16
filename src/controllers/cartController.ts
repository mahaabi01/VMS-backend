import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";

class CartController {
  //addToCart
  async addToCart(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      res.status(400).json({
        message: "Please provide quantity,productId",
      });
    }
    // check if the the product alreay exists in the cart table or not
    let cartItem = await Cart.findOne({
      where: {
        productId,
        userId,
      },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // insert into Cart table
      cartItem = await Cart.create({
        quantity,
        userId,
        productId,
      });
    }

    const data = await Cart.findAll({
      where: {
        userId,
      },
    });

    res.status(200).json({
      message: "Product added to cart",
      data,
    });
  }

  //get user cart
  async getMyCarts(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const cartItems = await Cart.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (cartItems.length === 0) {
      res.status(404).json({
        message: "No item in the cart",
      });
    } else {
      res.status(200).json({
        message: "Cart items fetched succesfully",
        data: cartItems,
      });
    }
  }

  //delete user cart item
  async deleteMyCartItem(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { cartId } = req.params;
    // check whether above productId product exist or not
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      res.status(404).json({
        message: "No cart with that id",
      });
      return;
    }
    // delete that productId from userCart
    if (userId === cart.dataValues.userId) {
      await Cart.destroy({
        where: {
          cartId,
        },
      });
      res.status(200).json({
        message: "Cart deleted successfully",
      });
    } else {
      res.status(500).json({
        message: "You cannot delete this.",
      });
    }
  }

  //update cart item
  async updateCartItem(req: AuthRequest, res: Response): Promise<void> {
    const { cartId } = req.params;
    const userId = req.user?.id;
    const { quantity } = req.body;
    if (!quantity) {
      res.status(400).json({
        message: "Please provide quantity",
      });
      return;
    }
    const cartData = await Cart.findOne({
      where: {
        id: cartId,
      },
    });
    if (cartData) {
      if (userId === cartData?.dataValues.userId) {
        cartData.quantity = quantity;
        await cartData?.save();
        res.status(200).json({
          message: "Product of cart updated successfully",
          data: cartData,
        });
      } else {
        res.status(500).json({
          message: "You cannot update that cart.",
        });
      }
    } else {
      res.status(404).json({
        message: "No product cart of that user",
      });
    }
  }
}

export default new CartController();
