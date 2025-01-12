import express, { Router } from 'express'
import errorHandler from '../services/catchAsyncError'
import cartController from '../controllers/cartController'
import authMiddleware, { Role } from '../middleware/authMiddleware'

const router:Router = express.Router()

//add to cart
router.route("/addToCart")
.post(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Customer), cartController.addToCart)

//get user cart
router.route("/getMyCart")
.get(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Customer), cartController.getMyCarts)

//deleteMyCartItem
router.route("/deleteMyCartItem")
.delete(authMiddleware.isAuthenticated, authMiddleware.restrictTo(Role.Customer), cartController.deleteMyCartItem)

//updateCartItem
router.route("/updateCartItem/:id")
.patch(authMiddleware.isAuthenticated , authMiddleware.restrictTo(Role.Customer), cartController.updateCartItem)

//delete Cart Item
router.route("/deleteMyCart/:id")
.delete(authMiddleware.isAuthenticated, cartController.deleteMyCartItem)

export default router