import { Request, Response } from "express";
import Product from "../models/product.model";
import { getParams } from "../utils/paginate";
import ProductVariant from "../models/product_variant.model";
import ProductCategory from "../models/intermediate/product_category";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { paginate, page, sortBy, order, limit } = req?.query;
    if (paginate) {
      const params = getParams(page, limit, sortBy, order, [
        "name",
        "price",
        "createdAt",
        "updatedAt",
      ]);
      const sort: any = {};
      sort[params.sortBy] = params.order;
      const data = await Product.paginate(
        {},
        {
          page: params.page,
          limit: params.limit,
          sort: sort,
        }
      );
      res.json({ ...data });
    } else {
      const params = getParams(page, limit, sortBy, order, [
        "name",
        "price",
        "createdAt",
        "updatedAt",
      ]);
      const sort: any = {};
      sort[params.sortBy] = params.order;
      const data = await Product.find({}).sort(sort);
      res.json({ data });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Error in get all products controller",
      error: error?.message,
    });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        message: "Product Not Found.",
      });
    }
    res.json({ product });
  } catch (error: any) {
    res.status(500).json({
      message: "Error in find one product by id controller",
      error: error?.message,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      short_description,
      price,
      image,
      images,
      hasVariants,
      variants,
      categories,
    } = req.body;
    const product = await Product.create({
      name,
      description,
      short_description,
      price,
      image,
      images,
      hasVariants,
    });
    if(Array.isArray(categories) && categories.length > 0){
      const formatData = categories.map((id:string|number) => {
        return { product: product._id, category: id };
      })
      await ProductCategory.insertMany(formatData)
    }
    if(hasVariants){
      const productVariants = await ProductVariant.insertMany({
        ...variants
      });
      res.status(201).json({
        product: {
          ...product,
          variants: productVariants,
        },
      });
      return;
    }else {
      res.status(201).json({
        product
      });
      return;
    }
    
    
  } catch (error: any) {
    res.status(500).json({
      message: "Error in creating product controller",
      error: error?.message,
    });
    return;
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    
  } catch (error:any) {
    
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {}
};
