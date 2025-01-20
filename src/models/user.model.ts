import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type:String,
        required:false
    },
    short_description : {
        type: String,
        required: false
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }
});