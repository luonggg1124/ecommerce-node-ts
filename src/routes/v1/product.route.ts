import express from "express";
import { create, findById, getAll } from "../../controllers/product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { createProductRequest } from "../../requests/product/create.request";

const productRoutes = express.Router();

productRoutes.get('/', getAll);
productRoutes.get('/:id',findById);
productRoutes.post('/',createProductRequest ,create);
export default productRoutes;