import mongoose from "mongoose";



const productAttributeValueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const productAttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    filter: {
        type: Boolean,
        default: false
    }
});

const ProductAttribute = mongoose.model('Product', productAttributeSchema);
export default ProductAttribute;