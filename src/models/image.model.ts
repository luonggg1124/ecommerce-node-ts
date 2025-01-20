import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    cloud: {
        type: String,
        enum: ["CLOUDINARY","OTHERS"],
        required: false
    },
    folder: {
        type: String,
        required: false
    },
    alt_text:{
        type: String,
        required: false
    }
},{
    timestamps: true
});


const Image = mongoose.model("Image",imageSchema);
export default Image;