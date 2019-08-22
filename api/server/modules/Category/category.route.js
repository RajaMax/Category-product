import express from "express";
import CategoryController from "./category.controller"


const CategoryRouter = express.Router();

CategoryRouter.get('/allcategory',CategoryController.getAllCategory);

CategoryRouter.get('/category',CategoryController.getCategory);
CategoryRouter.post('/category',CategoryController.createCategory);
CategoryRouter.post('/category/:id',CategoryController.updateCategory);
CategoryRouter.delete('/category/:id',CategoryController.deleteCategory);



export default CategoryRouter;