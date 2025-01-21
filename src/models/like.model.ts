import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    target: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    targetType: {
        type: String,
        enum: ["Product", "Review", "Comment"],
        required: true
    }
},{
    timestamps: true
});

const Like = mongoose.model("Like", likeSchema);

export default Like;