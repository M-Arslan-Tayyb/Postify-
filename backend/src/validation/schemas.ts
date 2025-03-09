import Joi from "joi";

// Signup Validation Schema
export const signupSchema = Joi.object({
  firstName: Joi.string().min(3).required().messages({
    "string.min": "First name must be at least 3 characters.",
    "any.required": "First name is required.",
  }),
  lastName: Joi.string().min(3).required().messages({
    "string.min": "Last name must be at least 3 characters.",
    "any.required": "Last name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters.",
    "any.required": "Password is required.",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
      "any.required": "Confirm Password is required.",
    }),
  
});

// Login Validation Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});

// Create User Validation Schema

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(3).required().messages({
    "string.min": "First name must be at least 3 characters.",
    "any.required": "First name is required.",
  }),
  lastName: Joi.string().min(3).required().messages({
    "string.min": "Last name must be at least 3 characters.",
    "any.required": "Last name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters.",
    "any.required": "Password is required.",
  }),
  role: Joi.string().valid("Admin", "User").required().messages({
    "any.only": "Role must be either 'Admin' or 'User'.",
    "any.required": "Role is required.",
  }),
});
