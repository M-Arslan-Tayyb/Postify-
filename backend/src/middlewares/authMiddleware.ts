import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/CustomError";

// Define a custom request type to include `user`
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// ✅ **Middleware to Authenticate JWT Token**
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      throw new CustomError("No token, authorization denied", 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };

      if (!decoded) {
        throw new CustomError("Token is not valid", 401);
      }

      req.user = decoded; // Attach decoded user data to `req`
      next();
    } catch (e) {
      throw new CustomError("Invalid Token", 401);
    }
  } catch (err) {
    next(err);
  }
};

//**Middleware for Role-Based Access Control**
export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return next(new CustomError("Unauthorized access", 403));
      }
      next();
    };
  };