import { Request, Response, NextFunction } from "express";

const asyncErrorHandler =(func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err) => next(err));
  };

export default asyncErrorHandler;
