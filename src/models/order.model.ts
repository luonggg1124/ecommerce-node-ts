import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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
      type: String,
      required: true,
    },
  ],
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  sub_total_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  tax_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  payment_status: {
    type: String,
    enum: [
      "CANCELLED",
      "WAITING_PAYMENT",
      "WAITING_CONFIRM",
      "CONFIRMED",
      "DELIVERING",
      "DELIVERED",
      "COMPLETED",
      "WAITING_ACCEPT_RETURN",
      "RETURN_PROCESSING",
      "DENIED_RETURN",
      "RETURNED",
    ],
    default: "WAITING_CONFIRM",
  },
  payment_method: {
    type: String,
    enum: [
      "MOMO_WALLET",
      "CASH_ON_DELIVERY",
      "VNPAY_WALLET",
      "ONLINE_TRANSFER",
    ],
    default: "CASH_ON_DELIVERY",
  },
  shipping_method: {
    type: String,
  },
  shipping_amount: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  amount_collected: {
    type: Number,
    min: 0,
    required: true,
  },
  receiver_name: {
    type: String,
  },
  receiver_phone: {
    type: String,
  },
  receiver_email: {
    type: String,
  },
  receiver_full_address: {
    type: String,
  },
  receiver_city: {
    type: String,
  },
  receiver_district: {
    type: String,
  },
  receiver_commune: {
    type: String,
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voucher",
    default: null,
  },
  order_items: [itemSchema],
  note: {
    type: String,
    default: "",
  },
});
