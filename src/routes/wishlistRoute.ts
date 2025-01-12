import express, { Router } from "express";
import wishlistController from "../controllers/wishlistController";
import authMiddleware, { Role } from "../middleware/authMiddleware";

const router: Router = express.Router();

// add Wishlist
router
  .route("/addWishlist")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer),
    wishlistController.addWishlist
  );

//get user wishlist
router
  .route("/getuserwishlist")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer),
    wishlistController.getMyWishlist
  );

//delete wishlist
router
  .route("/deletewishlist/:wishlistId")
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer || Role.Admin),
    wishlistController.deleteWishlist
  );

//update wishlist
router
  .route("/updatewishlist/:wishlistId")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer || Role.Admin),
    wishlistController.updateWishlist
  );

export default router;
