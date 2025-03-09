import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandling";
import { signupService, loginService,createUserService } from "../services/authService";



export const signupController = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const response = await signupService({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  return res.status(response.status).json(response);
});

export const loginController = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
    const response = await loginService({ email, password });
  
    return res.status(response.status).json(response);
  });


export const createUserController = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, role } = req.body;
  const createdBy = req.user.id; // This should be extracted from the authenticated user (JWT)

  const response = await createUserService({ firstName, lastName, email, password, role, createdBy });

  return res.status(response.status).json(response);
});

