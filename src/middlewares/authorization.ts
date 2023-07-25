import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../modules/common/services/responses";
import sessionsService from "../modules/auth/sessions.service";

export function apiAuthorization(req: Request, res: Response, next: NextFunction) {
  const authorization = req.header("Authorization");
  if (!authorization || authorization.indexOf("Basic") === -1) {
    sendResponse({ res }, 401);
    return;
  }
  const auth_enconde = authorization.split(" ")[1];

  const username_api = process.env["USERNAME_API"];
  const password_api = process.env["PASSWORD_API"];
  const credentials = Buffer.from(auth_enconde, "base64").toString("ascii");
  const [username, password] = credentials.split(":");
  if (username !== username_api || password !== password_api) {
    sendResponse({ res }, 403);
    return;
  }

  next();
}

export async function validateSession(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.header("sessionid");
  if (!sessionId) {
    return sendResponse({ res }, 401);
  }

  const session = await sessionsService.find({ token: sessionId });

  if (!session) return sendResponse({ res }, 404);

  const today = new Date();
  const expires = session.expiresAt;

  if (today > expires) {
    return sendResponse({ res }, 407);
  }

  return next();
}
