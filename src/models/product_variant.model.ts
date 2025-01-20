import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    options: [
        {
            type:String,
            required:true
        }
    ],
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    ],
    price: {
        type: Number,
        min: 0,
        required: true
    },
    stock_qty: {
        type: Number,
        min: 0,
        required: true
    },
    sold_qty: {
        type: Number,
        min: 0,
        required: true
    }

},{
    timestamps:true
});

const ProductVariant = mongoose.model('ProductVariant',productVariantSchema);
export default ProductVariant;
