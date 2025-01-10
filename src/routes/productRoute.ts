import express, {Router} from 'express'
import productController from '../controllers/productController'
import errorHandler from '../services/catchAsyncError'

const router:Router = express.Router()

router.route("/addProduct").post(errorHandler(productController.addProduct))
router.route("/getAllProduct").get(errorHandler(productController.getAllProducts))

export default router