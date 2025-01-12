import { Request, Response } from "express";
import Comment from "../database/models/Comment";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../database/models/User";

// export interface AuthProductRequest extends AuthRequest {
//   user?: {
//     name: string;
//     role: Role;
//     email: string;
//     password: string;
//     phone: string;
//     address: string;
//     id: string;
//   },
//   product?: {
//     productId: string
//   }
// }

class CommentController {
  //add comment
  async addComment(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { comment, rating, productId } = req.body;
    if (!comment || !rating) {
      res.status(400).json({
        message: "Please provide productId, comment and rating.",
      });
      return;
    }
    await Comment.create({
      comment,
      rating,
      productId,
      likes: 0,
      userId,
    });
    res.status(200).json({
      message: "Comment added successfully.",
    });
  }

  //get all comments
  async getCommentByProductId(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const data = await Comment.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "name"],
        },
      ],
    });
    res.status(200).json({
      message: "Comment fetched successfully",
      data,
    });
  }

  //get single comment
  async getCommentById(req: Request, res: Response): Promise<void> {
    const { commentId } = req.params;
    console.log("Comment ID:", commentId);
    const data = await Comment.findOne({
      where: {
        id: commentId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "name"],
        },
      ],
    });
    if (!data) {
      res.status(404).json({
        message: "No comment with that id.",
      });
    } else {
      res.status(200).json({
        message: "Comment fetched successfully.",
        data,
      });
    }
  }

  //delete Comment
  async deleteComment(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    console.log("User ID:", userId);
    const { commentId } = req.params;
    const comment = await Comment.findAll({
      where: {
        id: commentId,
      },
    });
    if (comment.length > 0) {
      if (userId === comment[0].dataValues.userId) {
        await Comment.destroy({
          where: {
            id: commentId,
          },
        });
      } else {
        res.status(500).json({
          message: "You cannot delete this comment.",
        });
      }
      res.status(200).json({
        message: "Comment deleted successfully.",
      });
    } else {
      res.status(404).json({
        message: "No comment with that id.",
      });
    }
  }

  //updateProduct
  async updateComment(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { commentId: id } = req.params;
    const { comment, rating } = req.body;
    const existingComment = await Comment.findByPk(id);

    if (!existingComment) {
      res.status(404).json({
        message: "No comment found with the given ID.",
      });
      return;
    }
    if (userId === existingComment.dataValues.userId) {
      try {
        await Comment.update(
          {
            ...(comment && { comment }),
            ...(rating && { rating }),
          },
          { where: { id } }
        );

        res.status(200).json({
          message: "Comment updated successfully.",
        });
      } catch (error) {
        res.status(500).json({
          message: "An error occurred while updating the comment.",
        });
      }
    } else {
      res.status(400).json({
        message: "You cannot update this comment.",
      });
    }
  }
  //like comment
 
  

  //unlike comment
}

export default new CommentController();
