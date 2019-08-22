import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
    name: {
        type: String
    }
}, {
    collection: 'category',
    timestamps: true
});

let CategoryModel = mongoose.model('category', CategorySchema);

export default CategoryModel