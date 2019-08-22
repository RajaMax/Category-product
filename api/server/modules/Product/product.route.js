import express from "express";
import ProductController from "./product.controller"


const ProductRouter = express.Router();

ProductRouter.get('/product',ProductController.getAllProduct);
ProductRouter.post('/category/:category_id/product',ProductController.createProduct);
ProductRouter.post('/product/:id',ProductController.updateProduct);
ProductRouter.delete('/product/:id',ProductController.deleteProduct);



export default ProductRouter;