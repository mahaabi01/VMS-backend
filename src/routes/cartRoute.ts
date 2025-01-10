import express, { Router } from 'express'
import errorHandler from '../services/catchAsyncError'
import cartController from '../controllers/cartController'
import authMiddleware from '../middleware/authMiddleware'

const router:Router = express.Router()

router.route("/addToCart").post(errorHandler(authMiddleware.isAuthenticated), errorHandler(cartController.addToCart))
router.route("/getMyCart").get(errorHandler(cartController.getMyCarts))
router.route("/deleteMyCartItem").delete(errorHandler(cartController.deleteMyCartItem))
router.route("/updateCartItem").patch(errorHandler(cartController.updateCartItem))

export default router