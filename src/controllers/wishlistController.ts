import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Wishlist from "../database/models/Wishlist";
import User from "../database/models/User";

class WishlistController {
  //addWishlist
  async addWishlist(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { productName } = req.body;
    if (!productName) {
      res.status(400).json({
        message: "Please provide product name.",
      });
    }
    //check of product already exist in wishlist
    let wishlistItem = await Wishlist.findOne({
      where: {
        productName,
        userId,
      },
    });
    console.log("Wish List Item :", wishlistItem);
    if (!wishlistItem) {
      console.log("Not in wish list");
      let wishlist = await Wishlist.create({
        productName,
        userId,
      });
      res.status(200).json({
        message: "Product is added in your wishlist.",
        data: wishlist,
      });
    } else {
      res.status(500).json({
        message: "Product is already in your wishlist.",
      });
    }
  }

  //getUserWishList
  async getMyWishlist(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const wishlist = await Wishlist.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          attributes: ["name", "role", "email", "phone", "address"],
        },
      ],
    });
    if (wishlist.length === 0) {
      res.status(404).json({
        message: "No wishlist found for this user.",
      });
    } else {
      res.status(200).json({
        message: "Wishlist fetched succesfully.",
        data: wishlist,
      });
    }
  }

  //deleteWishlist
  async deleteWishlist(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { wishlistId: id } = req.params;
    //check whether aboce provided wishlistId exist or not
    const wishlist = await Wishlist.findByPk(id);
    if (!wishlist) {
      res.status(404).json({
        message: "No wishlist with that id.",
      });
      return;
    }
    //delete that wishlist
    console.log("Check check: ", wishlist.dataValues.userId);
    if (userId === wishlist.dataValues.userId) {
      await Wishlist.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Wishlist deleted succesfully.",
      });
    } else {
      res.status(500).json({
        message: "You cannot delete that wishlist.",
      });
    }
  }

  //update wishlist
  async updateWishlist(req: AuthRequest, res: Response): Promise<void> {
    const { wishlistId } = req.params;
    const userId = req.user?.id;
    const { productName } = req.body;
    if (!productName) {
      res.status(404).json({
        message: "Please provide productName.",
      });
      return;
    }
    const wishlistData = await Wishlist.findOne({
      where: {
        id: wishlistId,
      },
    });
    if (wishlistData) {
      if (userId === wishlistData?.dataValues.userId) {
        wishlistData.productName = productName;
        await wishlistData?.save();
        res.status(200).json({
          message: "Wishlist updated successfully.",
          data: wishlistData,
        });
      } else {
        res.status(500).json({
          message: "You cannot update that cart.",
        });
      }
    } else {
      res.status(404).json({
        message: "No wishlist for that user.",
      });
    }
  }
}

export default new WishlistController();
