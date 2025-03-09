import express from "express";
import { createPostController, getAllPostsController } from "../controllers/postController";
import {authMiddleware} from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.get("/all-posts", getAllPostsController);
router.post("/create-post", authMiddleware, roleMiddleware(["User"]), upload.single("thumbnail"), createPostController);

export default router;
