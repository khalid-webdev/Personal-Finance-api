import { NextFunction, Request, RequestHandler, Response } from "express";
type AsyncHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;

const asyncHandler = (handler:AsyncHandlerType): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  }
};

export default asyncHandler;

