import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { CustomError } from "../utils/CustomError";

// Middleware for validating requests using Joi
const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new CustomError(errors.join(", "), 400));
    }

    next();
  };
};

export default validateRequest;
