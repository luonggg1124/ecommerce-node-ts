import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["PRODUCT", "POST"],
        default: "GENERAL"
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;