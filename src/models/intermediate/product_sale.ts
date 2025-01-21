import mongoose from "mongoose";

const productSaleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale",
        required: true
    }
});
const ProductSale = mongoose.model("ProductSale",productSaleSchema);
export default ProductSale;