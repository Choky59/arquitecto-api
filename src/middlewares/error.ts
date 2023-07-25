import { NextFunction, Request, Response } from "express";
import winston from "winston";
import { sendResponse } from "../modules/common/services/responses";

export default function (err: Error, req: Request, res: Response, _next: NextFunction) {
  winston.error(err.message, req.originalUrl);
  return sendResponse(
    {
      res,
    },
    500
  );
}
