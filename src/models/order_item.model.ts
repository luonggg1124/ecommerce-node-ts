import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  total_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  options: [
    {
      attribute: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;