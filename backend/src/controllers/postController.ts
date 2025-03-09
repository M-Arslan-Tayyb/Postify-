import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandling";
import { createPostService } from "../services/postService";
import { getAllPostsService } from "../services/postService";

export const createPostController = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const authorId = req.user?.id;
  const thumbnail = req.file || undefined; 

  const response = await createPostService({ title, content, authorId, thumbnail });

  return res.status(response.status).json(response);
});



export const getAllPostsController = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1; // Default to page 1
  const limit = parseInt(req.query.limit as string) || 10; // Default to 10 posts per page

  const response = await getAllPostsService(page, limit);
  return res.status(response.status).json(response);
});

