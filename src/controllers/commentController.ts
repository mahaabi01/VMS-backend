import { Request, Response } from "express";
import Comment from "../database/models/Comment";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../database/models/User";

class CommentController {
  //add comment
  async addComment(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { comment, rating } = req.body;
    if (!comment || !rating) {
      res.status(400).json({
        message: "Please provide comment and rating.",
      });
      return;
    }
    await Comment.create({
      comment,
      rating
    });
    res.status(200).json({
      message: "Comment added successfully.",
    });
  }

  //get all comments
  async getCommentByProductId(req: Request, res: Response): Promise<void> {
    const data = await Comment.findAll({
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
    const id = req.params.id;
    const data = await Comment.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
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
  async deleteComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Comment.findAll({
      where: {
        id: id,
      },
    });
    if (data.length > 0) {
      await Comment.destroy({
        where: {
          id: id,
        },
      });
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
  async updateComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { comment, rating } = req.body;

    const existingComment = await Comment.findByPk(id);

    if (!existingComment) {
      res.status(404).json({
        message: "No comment found with the given ID.",
      });
      return;
    }

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
        error: error.message,
      });
    }
  }

  //like comment 



  //unlike comment

  
}

export default new CommentController();
