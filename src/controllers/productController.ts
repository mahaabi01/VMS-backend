import { Request, Response } from "express";
import Product from "../database/models/Product";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../database/models/User";
import { Op } from "sequelize";

class ProductController {
  async addProduct(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { name, description, price, category, stock } = req.body;
    let fileName;
    if (req.file) {
      fileName = req.file.filename;
    } else {
      fileName =
        "https://img.freepik.com/free-vector/camera-pictures_1284-13129.jpg?t=st=1736498845~exp=1736502445~hmac=9e77ecb9f7066a5fb416430593021e23493e03c1ce98239bb1221a30f63fd00b&w=740";
    }
    if (!name || !description || !price || !category || !stock) {
      res.status(400).json({
        message: "Please provide name, description, price, category and stock.",
      });
      return;
    }
    await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: fileName,
      userId,
    });
    res.status(200).json({
      message: "Product added successfully.",
    });
  }

  //get all products
  async getAllProducts(req: Request, res: Response): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "name"],
        },
      ],
    });
    res.status(200).json({
      message: "Product fetched successfully",
      data,
    });
  }

  //get product by category
  async getProductByFilters(req: Request, res: Response): Promise<void> {
    const { category, minPrice, maxPrice } = req.query;
    try {
      const filters: any = {};
      if (category) {
        filters.category = category;
      }
      if (minPrice && maxPrice) {
        filters.price = {
          [Op.between]: [Number(minPrice), Number(maxPrice)],
        };
      } else if (minPrice) {
        filters.price = {
          [Op.gte]: Number(minPrice),
        };
      } else if (maxPrice) {
        filters.price = {
          [Op.lte]: Number(maxPrice),
        };
      }

      //fetch products with filters
      const products = await Product.findAll({
        where: filters,
      });

      if (products.length === 0) {
        res.status(404).json({
          message: "No products found for the given filters.",
        });
        return;
      }
      res.status(200).json({
        message: "Product fetched succesfully.",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occured while retrieving products",
        error: error,
      });
    }
  }

  //get single product
  async getSingleProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data = await Product.findOne({
      where: {
        id: id,
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
        message: "No product with that id.",
      });
    } else {
      res.status(200).json({
        message: "Product fetched successfully.",
        data,
      });
    }
  }

  //deleteProduct
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Product.findAll({
      where: {
        id: id,
      },
    });
    if (data.length > 0) {
      await Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Product deleted successfully.",
      });
    } else {
      res.status(404).json({
        message: "No product with that id.",
      });
    }
  }

  //update Product
  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    let fileName;

    if (req.file) {
      fileName = req.file?.filename;
    }

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      res.status(404).json({
        message: "No product found with the given ID.",
      });
      return;
    }

    try {
      await Product.update(
        {
          ...(name && { name }),
          ...(description && { description }),
          ...(price && { price }),
          ...(category && { category }),
          ...(stock && { stock }),
          ...(fileName && { imageUrl: fileName }),
        },
        { where: { id } }
      );

      res.status(200).json({
        message: "Product updated successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while updating the product.",
        error: "Error Occured",
      });
    }
  }
}

export default new ProductController();
