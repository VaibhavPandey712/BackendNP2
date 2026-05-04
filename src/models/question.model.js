import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    platform: {
        type: String,
        enum: ["leetcode", "codeforces"],
        required: true
    },
    URL: {
        type: String,
        required: true
    },
    Rating: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const postModel = mongoose.model("Question", postSchema);

export default postModel;
