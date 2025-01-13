import express, { Router } from "express";
import errorHandler from "../services/catchAsyncError";
import orderController from "../controllers/orderController";
import authMiddleware, { Role } from "../middleware/authMiddleware";

export const router: Router = express.Router();

//create Order
router
  .route("/createOrder")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer),
    orderController.createOrder
  );

//get order by id
router
  .route("/getorderbyid/:id")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer),
    orderController.getOrderById
  );

//get all orders
router
  .route("/getallorder")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    orderController.getAllOrders
  );

//update order status
router
  .route("/updateorderstatus/:orderId")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    orderController.updateorderstatus
  );

  //delete order
  router.route("/deleteorder/:orderId")
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    orderController.deleteorder
  )
export default router;
