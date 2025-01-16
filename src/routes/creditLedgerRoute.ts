import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import creditLedgerController from "../controllers/creditLedgerController";

const router: Router = express.Router();

//update payment
router
  .route("/updatePayment/:id")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    creditLedgerController.updatePayment
  );

  //get credit LedgerById
  router.route("/getCreditLedger/:id")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    creditLedgerController.getCreditLedgerById
  )

  


export default router;
