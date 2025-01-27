import mongoose, { Document, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
interface IProductVariant extends Document {
  product?: mongoose.Types.ObjectId;
  name: string;
  options: object[];
  image?: string;
  images?: string[];
  price: number;
  stock_qty: number;
  sold_qty: number;
}

const productVariantSchema = new Schema<IProductVariant>(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    stock_qty: {
      type: Number,
      min: 0,
      required: true,
    },
    sold_qty: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
productVariantSchema.plugin(mongoosePaginate);
const ProductVariant = model<
  IProductVariant,
  mongoose.PaginateModel<IProductVariant>
>("ProductVariant", productVariantSchema);
export default ProductVariant;
