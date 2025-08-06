import express, { Router } from "express";
import errorHandler from "../services/catchAsyncError";
import authMiddleware, { Role } from "../middleware/authMiddleware";
import commentController from "../controllers/commentController";

const router: Router = express.Router();

//add a comment
router
  .route("/addComment")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer),
    commentController.addComment
  );

//get all comment
router
  .route("/getAllComment/:productId")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer || Role.Admin),
    commentController.getCommentByProductId
  );

//get single comment
router
  .route("/getSingleComment/:commentId")
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer || Role.Admin),
    commentController.getCommentById
  );

//delete Comment
router
  .route("/deleteComment/:commentId")
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer || Role.Admin),
    commentController.deleteComment
  );

//update Comment
router
  .route("/updateComment/:commentId")
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Customer || Role.Admin),
    commentController.updateComment
  );

//like comment
router
.route("/likeComment/:commentId")
.patch(authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Customer),
  commentController.likeComment
)


export default router;
