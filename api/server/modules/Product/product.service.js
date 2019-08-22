import ProductModel from "./product.model";
const fs = require('fs');
var mongoose = require('mongoose');
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;

const ProductService = {


  getAllProduct: async (searchkey, limit, skip) => {
    /////////ok//////
    try {
      var json = {},
        findObj
      if (searchkey) {
        findObj = {
          "name": {
            "$regex": searchkey,
            "$options": "i"
          }
        }
      } else {
        findObj = {}
      }
      const count = await ProductModel.find(findObj).count();
      const product = await ProductModel.find(findObj).populate('category_id').sort({
        "createdAt": -1
      }).skip(skip).limit(limit).lean();
      console.log(product)
      var productArray = product
      json.totalpage = Math.ceil(count / limit);
      json.totalcount = count;
      json.product = productArray;
      return json;
    } catch (error) {
      throw error;
    }
  },

  getProductByName: async (name, id) => {
    /////////ok//////
    try {
      var findObj = {};
      if (id === '') {
        findObj = {
          name: name
        }
      } else {
        var arr = [];
        var objId = mongoose.Types.ObjectId(id);
        arr.push(objId);
        findObj = {
          _id: {
            "$nin": arr
          },
          name: name
        }
      }
      const Product = await ProductModel.find(findObj);
      return Product;
    } catch (error) {
      throw error;
    }

  },



  createProduct: async newProduct => {
    try {
      var savedProduct = await new ProductModel(newProduct).save();
      return savedProduct
    } catch (error) {
      throw error;
    }
  },
  updateProduct: async (id, data) => {
    try {
      const update = await ProductModel.findOneAndUpdate({
        _id: id
      }, data, {
        strict: true,
        new: true
      });
      return update;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      console.log(id)
      var data = await ProductModel.findByIdAndRemove(id);;
      return data;
    } catch (error) {
      throw error;
    }
  }
};
export default ProductService;