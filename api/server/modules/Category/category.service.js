import CategoryModel from "./category.model";
const fs = require('fs');
var mongoose = require('mongoose');
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;

const CategoryService = {
  getAllCategory:async()=>{
    try {
      const category = await CategoryModel.find({});
      return category;
    } catch (error) {
      throw error;
    }
  },

  getCategory: async (searchkey, limit, skip) => {
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
      const count = await CategoryModel.find(findObj).count();
      const category = await CategoryModel.find(findObj).sort({
        "createdAt": -1
      }).skip(skip).limit(limit).lean();
      console.log(category)
      var categoryArray = category
      json.totalpage = Math.ceil(count / limit);
      json.totalcount = count;
      json.category = categoryArray;
      return json;
    } catch (error) {
      throw error;
    }
  },

  getCategoryByName: async (name, id) => {
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
      const Category = await CategoryModel.find(findObj);
      return Category;
    } catch (error) {
      throw error;
    }

  },



  createCategory: async newCategory => {
    try {
      var savedCategory = await new CategoryModel(newCategory).save();
      return savedCategory
    } catch (error) {
      throw error;
    }
  },
  updateCategory: async (id, data) => {
    try {
      const update = await CategoryModel.findOneAndUpdate({
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

  deleteCategory: async (id) => {
    try {
      console.log(id)
      var data = await CategoryModel.findByIdAndRemove(id);;
      return data;
    } catch (error) {
      throw error;
    }
  }
};
export default CategoryService;