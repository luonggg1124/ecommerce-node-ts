import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    target: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    targetType: {
        type: String,
        enum: ["PRODUCT","VARIANT"],
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    }
});

const CartItem = mongoose.model('CartItem',cartItemSchema);
export default CartItem;