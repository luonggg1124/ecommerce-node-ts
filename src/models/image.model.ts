import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    cloud: {
        type: String,
        enum: ["CLOUDINARY","OTHERS"],
        default: "OTHERS"
    },
    folder: {
        type: String,
        
    },
    alt_text:{
        type: String,
        
    }
},{
    timestamps: true
});


const Image = mongoose.model("Image",imageSchema);
export default Image;