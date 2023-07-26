import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { sendResponse } from "./responses";

export function createValidation(validators: ValidationChain[]) {
  return [
    ...validators,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        sendResponse(
          {
            res,
            data: { missing: errors.array().map((e) => e.msg) },
          },
          400
        );
        return;
      }

      next();
    },
  ];
}

export const invalidTitles: string[] = ["watchlist", "wishlist", "saved"];

export function isValidListName(listTitle: string) {
  if (invalidTitles.includes(listTitle)) return false;
  return true;
}
