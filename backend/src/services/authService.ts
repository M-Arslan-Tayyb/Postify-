import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModal";
import { CustomError,AuthenticationError } from "../utils/CustomError";


interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginInput {
    email: string;
    password: string;
  }

// Service for Signing Up (Super Admin Only)
export const signupService = async ({ firstName, lastName, email, password, confirmPassword }: SignupInput) => {
  // Check if a Super Admin already exists
  const existingSuperAdmin = await User.findOne({ role: "SuperAdmin" });
  if (existingSuperAdmin) {
    throw new CustomError("Super Admin already exists. Only one Super Admin is allowed.", 403);
  }

  // Validate Password Match
  if (password !== confirmPassword) {
    throw new CustomError("Passwords do not match", 400);
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create Super Admin
  const superAdmin = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: "SuperAdmin",
  });

  return {
    status: 201,
    success: true,
    message: "Super Admin created successfully",
    user: {
      id: superAdmin._id,
      firstName: superAdmin.firstName,
      lastName: superAdmin.lastName,
      email: superAdmin.email,
      role: superAdmin.role,
    },
  };
};

// Service for User Login (Admin, SuperAdmin, and User)
export const loginService = async ({ email, password }: LoginInput) => {
  // Fetch user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError("User not found.", 404);
  }

  // Validate Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthenticationError("Invalid credentials", 400);
  }

  // Generate JWT Token
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

  // Remove password field before returning
  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    status: 200,
    success: true,
    message: "Logged in successfully",
    token,
    user: userWithoutPassword,
  };
};


interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "Admin" | "User";
  createdBy: string; // ID of the logged-in user (Super Admin or Admin)
}

//  **Service to Create Admin/User (Super Admin → Admin & User, Admin → Only User)**
export const createUserService = async ({ firstName, lastName, email, password, role, createdBy }: CreateUserInput) => {
  if (!createdBy) {
    throw new CustomError("Created by user ID is missing", 400);
  }

  // Find the requesting user (Super Admin or Admin)
  const requestingUser = await User.findById(createdBy);
  if (!requestingUser) {
    throw new CustomError("Requesting user not found", 404);
  }

  // ✅ **Super Admin can create both Admins & Users, but Admin can only create Users**
  if (requestingUser.role === "Admin" && role !== "User") {
    throw new CustomError("Admins can only create Users, not other Admins.", 403);
  }

  if (requestingUser.role !== "SuperAdmin" && requestingUser.role !== "Admin") {
    throw new CustomError("Unauthorized. Only Super Admins and Admins can create users.", 403);
  }

  // Check if User Already Exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User with this email already exists.", 400);
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create New User (Admin/User)
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password field before returning
  const { password: _, ...userWithoutPassword } = newUser.toObject();

  return {
    status: 201,
    success: true,
    message: `${role} created successfully`,
    user: userWithoutPassword,
  };
};

