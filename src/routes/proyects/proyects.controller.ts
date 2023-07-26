import { Request, Response } from "express";
import { sendResponse } from "../../modules/common/services/responses";
import detailsService from "../../modules/proyects/details.service";
import firebaseAdmin from "../../middlewares/firebase/firebaseAdmin";
import { ObjectId } from "mongodb";
import assetsService from "../../modules/proyects/assets.service";
import { addAssetBody } from "../../modules/proyects/proyects.interface";

class ProyectsController {
  public async createDetails(req: Request, res: Response) {
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

  public async getAssets(_: Request, res: Response) {
    const assets = await detailsService.findAll();
    return sendResponse({ res, data: { assets } }, 200);
  }

  public async getProyectDetails(_: Request, res: Response) {
    const proyects = await detailsService.findAll();
    return sendResponse({ res, data: { proyects } }, 200);
  }

  public async deleteProyectDetails(req: Request, res: Response) {
    const { proyectId } = req.body as { proyectId: string };
    const mongoProyectId = new ObjectId(proyectId);
    const proyect = await detailsService.findOne({ _id: mongoProyectId });
    if (!proyect) return sendResponse({ res }, 505);
    await detailsService.deleteOne({ _id: mongoProyectId });
    return sendResponse({ res, data: { deleted: { ...proyect }, status: "deleted" } }, 200);
  }

  public async addAsset(req: Request, res: Response) {
    const { name, description, priority, imgBase64 } = req.body as addAssetBody;
    const imageBuffer = Buffer.from(imgBase64, "base64");

    const data = {
      name,
      description,
      priority,
      proyect: null,
      createdAt: new Date(),
    };
    const assetDocument = await assetsService.insertOne(data);

    if (assetDocument.statusCode != 200) {
      return sendResponse({ res }, assetDocument.statusCode);
    }
    try {
      const destination = `images/${assetDocument.data.insertedId}.jpg`;
      const file = firebaseAdmin.Bucket.file(destination);
      await file.save(imageBuffer);
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "01-01-3000",
      });
      await assetsService.updateOne(
        { _id: assetDocument.data.insertedId },
        {
          $set: { imgUrl: url },
        }
      );
      return sendResponse({ res, data: { ...data, imgUrl: url } }, 200);
    } catch (error) {
      return sendResponse({ res }, 521);
    }
  }
}

export default new ProyectsController();
