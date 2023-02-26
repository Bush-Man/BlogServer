import PostModel from "../Models/PostModel.js";
import cloudinary from "../CloudinaryConfig.js";
// create post

export const createPost = async (req, res) => {
    const { title, desc, category, image } = req.body;
    try {
        const result = await cloudinary.uploader.upload(image, { folder: "blogs" });
        const post = await new PostModel({
            title,
            desc,
            category,
            image: {
                public_id: result.public_id,
                url:result.secure_url
            }
        });
        
        const savedPost = await post.save();
        res.status(200).json({data:savedPost});
    } catch (err) {
        res.status(500).json(err);
    }

}

//get all posts

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
        
    } catch (err) {
        res.status(500).json(err);
    }
}

//get single post

export const getPost = async(req, res) => {
    const id  = req.params.id;
    try{
        const post = await PostModel.findById(id);
        res.status(200).json(post);
        
    }catch(err) {
        res.status(200).json(err);
    }
}

//update post
export const updatePost = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(id,{ $set: req.body },{new:true});
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

//delete post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedPost = await PostModel.findByIdAndDelete(id)
        res.status(200).json("post Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
}
