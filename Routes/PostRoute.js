import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../Controllers/PostConroller.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);




export default router;