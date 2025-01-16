import express, { Router } from "express";
import productController from "../controllers/productController";
import errorHandler from "../services/catchAsyncError";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import { multer, storage } from "../middleware/multerMiddleware";

const upload = multer({ storage: storage });
const router: Router = express.Router();

// router.route("/addProduct").post(errorHandler(productController.addProduct))

//add product
router
  .route("/addProduct")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    upload.single("imageUrl"),
    productController.addProduct
  );

//get all product
router
  .route("/getAllProduct")
  .get(errorHandler(productController.getAllProducts));

//get product by category
router
  .route("/filter")
  .get(errorHandler(productController.getProductByFilters));

//get single product
router.route("/getSingleProduct/:id").get(productController.getSingleProduct);

//delete product
router
  .route("/deleteProduct/:id")
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    productController.deleteProduct
  );

//update Product
router
  .route("/updateProduct/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    productController.updateProduct
  );

export default router;
