import { Request, Response } from "express";
import { sendResponse } from "../../modules/common/services/responses";
import authService from "../../modules/auth/auth.service";
import sessionsService from "../../modules/auth/sessions.service";

class AuthController {
  
  public async getUser(req: Request, res: Response) {
    const sessionId = req.header("sessionId");
    const session = await sessionsService.findOne({ token: sessionId });
    const { password, ...rest } = (await authService.find({ _id: session!.userId }))!;
    return sendResponse({ res, data: { ...rest, token: session!.token } }, 200);
  }

  public async createUser(req: Request, res: Response) {
    const body = req.body as { username: string; password: string };
    const result = await authService.createUser(body);
    const { statusCode, ...rest } = result;
    return sendResponse({ res, data: { ...rest } }, statusCode);
  }

  public async createSession(req: Request, res: Response) {
    const body = req.body as { username: string; password: string };
    const userExists = await authService.find(body);

    if (!userExists) {
      return sendResponse({ res }, 519);
    }

    const result = await sessionsService.createSession(userExists._id!);
    return sendResponse({ res, data: result.data }, result.statusCode);
  }
}

export default new AuthController();
