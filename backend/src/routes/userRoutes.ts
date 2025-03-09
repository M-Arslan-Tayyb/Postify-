import express from "express";
import { createUserController, signupController, loginController } from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/authMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {createUserSchema, signupSchema,loginSchema} from "../validation/schemas";

const router = express.Router();

// Only Super Admin can create Admins & Users
router.post(
    "/create-user",
    authMiddleware, // Authenticate user first
    roleMiddleware(["SuperAdmin", "Admin"]), // Allow both Super Admins & Admins
    validateRequest(createUserSchema), // Validate request data
    createUserController
  );
  
//  Super Admin Signup (Only first signup is allowed)
router.post("/signup", validateRequest(signupSchema), signupController);

//  User Login (All users can login)
router.post("/login", validateRequest(loginSchema), loginController);



export default router;
