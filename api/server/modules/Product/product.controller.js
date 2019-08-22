import ProductService from "./product.service";
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;
var _ = require("lodash");

const ProductController = {

    getAllProduct: async (req, res) => {
        console.log("product details")
        try {
            var search;
            if (_.isEmpty(req.query.searchkey)) {
                search = '';
            } else {
                search = req.query.searchkey
            }
            let limit = Number(req.query.limit) || 10;
            let offset = (req.query.page) ? parseInt(req.query.page) : 1
            let skip = (offset - 1) * limit;
            const Product = await ProductService.getAllProduct(search, limit, skip);
            res.send({
                code: 200,
                status: "success",
                message: "List the Product",
                data: Product
            });
        } catch (error) {
            console.log(error)
            res.status(400).send({
                code: 400,
                status: "error",
                message: "List the Product",
                data: {}
            });
        }

    },

    createProduct: async (req, res) => {
        try {
            // console.log(req.body)
            // var data = JSON.parse(JSON.stringify(req.body));
            // console.log(data)
            let data = req.body
            console.log(data)
            var getProductByName = await ProductService.getProductByName(data.name, '');
            if (getProductByName.length > 0) {
                return res.status(400).send({
                    code: 400,
                    status: "error",
                    message: "Product is already here",
                    data: {}
                });
            }
            var product = {}
            product.category_id =req.params.category_id;
            product.name = data.name || "";
            var savedProduct = await ProductService.createProduct(product);
            return res.send({
                code: 200,
                status: "success",
                message: "New Product is created",
                data: savedProduct
            });

        } catch (error) {
            console.log(error)
            logger.error("Error in Creating Product :" + error);
            res.status(400).send({
                code: 400,
                status: "error",
                message: "Error in Creating Product",
                data: []
            });
        }
    },
    updateProduct: async (req, res) => {
        try {
            var id = req.params.id;
            var bodyData = JSON.parse(JSON.stringify(req.body));
            console.log(bodyData)
            var getProductByName = await ProductService.getProductByName(bodyData.name, id);
            if (getProductByName.length > 0) {
                return res.status(400).send({
                    code: 400,
                    status: "error",
                    message: "Product is already here",
                    data: {}
                });
            }
            var product = {}
            product.name = bodyData.name || "";
            product.category_id =bodyData.category_id;
            var savedProduct = await ProductService.updateProduct(id,product);
            return res.send({
                code: 200,
                status: "success",
                message: "Product is updated",
                data: savedProduct
            });

        } catch (error) {
            console.log(error)
            logger.error("Error in update Product :" + error);
            res.status(400).send({
                code: 400,
                status: "error",
                message: "Error in Update Product",
                data: []
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            var id= req.params.id;
            var deleteProduct = await ProductService.deleteProduct(id);
            res.send({
                code: 200,
                status: "success",
                message: "Product Deleted Successfully",
                data: {}
            });
            
        } catch (error) {
            console.log(error)
            res.status(400).send({
                code: 400,
                status: "error",
                message: "Error occured",
                data: {}
            });
        }
    }
};

export default ProductController;