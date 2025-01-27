import mongoose,{Document,Schema,model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IProduct extends Document{
  name: string;
  description: string;
  short_description: string;
  price: number;
  image: string;
  images?: string[];
  hasVariants: boolean;
  variants?: mongoose.Types.ObjectId[];
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    short_description: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
      ref: "Image",
      required:true
    },
    images: [
      {
        type: String,
        ref: "Image",
      },
    ],
    hasVariants: {
      type: Boolean,
      default: false,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
      },
    ],
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongoosePaginate);
const Product = model<IProduct,mongoose.PaginateModel<IProduct>>("Product", productSchema);
export default Product;
