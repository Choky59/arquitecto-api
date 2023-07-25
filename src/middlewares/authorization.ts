import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../modules/common/services/responses";

export function apiAuthorization(req: Request, res: Response, next: NextFunction) {
  const authorization = req.header("Authorization");
  if (!authorization || authorization.indexOf("Basic") === -1) {
    sendResponse({
      res,
      data: "Missing Authorization Header",
    },401);
    return;
  }
  const auth_enconde = authorization.split(" ")[1];

  const username_api = process.env["USERNAME_API"];
  const password_api = process.env["PASSWORD_API"];
  const credentials = Buffer.from(auth_enconde, "base64").toString("ascii");
  const [username, password] = credentials.split(":");
  if (username !== username_api || password !== password_api) {
    sendResponse({
      res,
      data: "Api Credentials are Invalid",
    },403);
    return;
  }

  next();
}
