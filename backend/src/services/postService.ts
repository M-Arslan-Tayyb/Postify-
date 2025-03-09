import Post from "../models/postModal";
import { uploadImageToCloudinary } from "../utils/imageUploader";
import { CustomError, DatabaseError } from "../utils/CustomError";

interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
  thumbnail?: Express.Multer.File; 
}

// ✅ **Service to Create a New Post**
export const createPostService = async ({ title, content, authorId, thumbnail }: CreatePostInput) => {
  try {
    console.log("data: ", title, content, authorId, thumbnail);
    let imageUrl = "";

    // ✅ Upload only if a file is provided
    if (thumbnail) {
      const uploadedImage = await uploadImageToCloudinary(thumbnail.path, "post-thumbnails");
      imageUrl = uploadedImage.secure_url;
    }

    // ✅ Create New Post in DB
    const newPost = await Post.create({
      title,
      content,
      thumbnail: imageUrl || "", // ✅ Store an empty string if no image is uploaded
      author: authorId,
    });

    return { status: 201, success: true, message: "Post created successfully", post: newPost };
  } catch (error) {
    throw new DatabaseError(error.message || "Error creating post", 500);
  }
};

// ✅ **Service to Fetch All Posts with Pagination**

export const getAllPostsService = async (page: number = 1, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit;

    // ✅ Fetch Posts with Pagination & Populate Author Details
    const posts = await Post.find()
      .populate("author", "firstName lastName email") // Only fetch required fields
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Latest posts first

    // ✅ Count total posts for pagination info
    const totalPosts = await Post.countDocuments();

    return {
      status: 200,
      success: true,
      message: "Posts fetched successfully",
      posts,
      pagination: {
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
      },
    };
  } catch (error) {
    throw new DatabaseError(error.message || "Error fetching posts", 500);
  }
};
