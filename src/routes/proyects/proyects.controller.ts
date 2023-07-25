import { Request, Response } from "express";
import { sendResponse } from "../../modules/common/services/responses";
import detailsService from "../../modules/proyects/details.service";
import firebaseAdmin from "../../middlewares/firebase/firebaseAdmin";

class ProyectsController {
  public async createProyect(req: Request, res: Response) {
    const { description, name, priority } = req.body as {
      description: string;
      name: string;
      priority: number;
    };

    const data = { createdAt: new Date(), description, name, priority };
    const result = await detailsService.insertOne(data);

    if (result == true) {
      return sendResponse({ res, data }, 200);
    }

    return sendResponse({ res }, 501);
  }

  public async addAsset(req: Request, res: Response) {
    const body = req.body;
    const imageBuffer = Buffer.from(body.imgUrl, 'base64');
    const destination = 'images/image.jpg';
    await firebaseAdmin.Bucket.file(destination).save(imageBuffer);
    return sendResponse({ res, data: 'done' }, 200);
  }
}

export default new ProyectsController();
