import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
        
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required:true
        },
        url: {
            type: String,
            required:true
        }
    }
}, { timestamps: true });

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;