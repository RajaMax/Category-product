import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    name: {
        type: String
    }
}, {
    collection: 'product',
    timestamps: true
});

let ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel