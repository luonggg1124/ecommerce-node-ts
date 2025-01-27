import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ["FIXED", "PERCENT"]
    },
    value:{
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "targetType"
    },
    targetType: {
        type: String,
        required: true,
        enum: ["PRODUCT", "PRODUCT_VARIANT"]
    }
},{
    timestamps:true
});