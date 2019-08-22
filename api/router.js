import express from "express";
import CategoryRouter from "./server/modules/Category/category.route";
import ProductRouter from "./server/modules/Product/product.route";

let router = [];

router.push(CategoryRouter)
router.push(ProductRouter)

export default router;