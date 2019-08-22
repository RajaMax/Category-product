import CategoryService from "./category.service";
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;
var _ = require("lodash");

const CategoryController = {
    getAllCategory: async (req, res) => {
        console.log("category details")
        try {

            const Category = await CategoryService.getAllCategory();
            res.send({
                code: 200,
                status: "success",
                message: "List the Category",
                data: Category
            });
        } catch (error) {
            console.log(error)
            res.status(400).send({
                code: 400,
                status: "error",
                message: "List the Category",
                data: {}
            });
        }
    },
    getCategory: async (req, res) => {
        console.log("category details")
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
            const Category = await CategoryService.getCategory(search, limit, skip);
            res.send({
                code: 200,
                status: "success",
                message: "List the Category",
                data: Category
            });
        } catch (error) {
            console.log(error)
            res.status(400).send({
                code: 400,
                status: "error",
                message: "List the Category",
                data: {}
            });
        }

    },

    createCategory: async (req, res) => {
        try {
            // console.log(req.body)
            // var data = JSON.parse(JSON.stringify(req.body));
            // console.log(data)
            let data = req.body
            console.log(data)
            var getCategoryByName = await CategoryService.getCategoryByName(data.name, '');
            if (getCategoryByName.length > 0) {
                return res.status(400).send({
                    code: 400,
                    status: "error",
                    message: "Category is already here",
                    data: {}
                });
            }
            var category = {}
            category.name = data.name || "";
            var savedCategory = await CategoryService.createCategory(category);
            return res.send({
                code: 200,
                status: "success",
                message: "New Category is created",
                data: savedCategory
            });

        } catch (error) {
            console.log(error)
            logger.error("Error in Creating Category :" + error);
            res.status(400).send({
                code: 400,
                status: "error",
                message: "Error in Creating Category",
                data: []
            });
        }
    },
    updateCategory: async (req, res) => {
        try {
            var id = req.params.id;
            var bodyData = JSON.parse(JSON.stringify(req.body));
            console.log(bodyData)
            var getCategoryByName = await CategoryService.getCategoryByName(bodyData.name, id);
            if (getCategoryByName.length > 0) {
                return res.status(400).send({
                    code: 400,
                    status: "error",
                    message: "Category is already here",
                    data: {}
                });
            }
            var category = {}
            category.name = bodyData.name || "";
            var savedCategory = await CategoryService.updateCategory(id, category);
            return res.send({
                code: 200,
                status: "success",
                message: "Category is updated",
                data: savedCategory
            });

        } catch (error) {
            console.log(error)
            logger.error("Error in update Category :" + error);
            res.status(400).send({
                code: 400,
                status: "error",
                message: "Error in Update Category",
                data: []
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            var id = req.params.id;
            var deleteCategory = await CategoryService.deleteCategory(id);
            res.send({
                code: 200,
                status: "success",
                message: "Category Deleted Successfully",
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

export default CategoryController;