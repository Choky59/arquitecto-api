import { addAssetBody } from "../../modules/proyects/proyects.interface";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { sendResponse } from "../../modules/common/services/responses";
import assetsService from "../../modules/proyects/assets.service";
import detailsService from "../../modules/proyects/details.service";
import firebaseAdmin from "../../middlewares/firebase/firebaseAdmin";

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
    const assets = await assetsService.findAll();
    return sendResponse({ res, data: { assets } }, 200);
  }

  public async getProyectDetails(_: Request, res: Response) {
    const proyects = await detailsService.findAll();
    return sendResponse({ res, data: { proyects } }, 200);
  }

  public async getProyectAssetsById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    console.log(id);
    const assets = await assetsService.find({ proyectId: new ObjectId(id) });
    return sendResponse({ res, data: { assets } }, 200);
  }

  public async deleteProyectDetails(req: Request, res: Response) {
    const { proyectId } = req.body as { proyectId: string };
    const mongoProyectId = new ObjectId(proyectId);
    const proyect = await detailsService.findOne({ _id: mongoProyectId });
    if (!proyect) return sendResponse({ res }, 505);
    await detailsService.deleteOne({ _id: mongoProyectId });
    return sendResponse({ res, data: { deleted: { ...proyect }, status: "deleted" } }, 200);
  }

  public async deleteAsset(req: Request, res: Response) {
    const { assetId } = req.body as { assetId: string };
    if (!assetId) return sendResponse({ res, data: { error: "missing asset id param" } }, 505);

    const destination = `images/${assetId}.jpg`;
    try {
      await firebaseAdmin.Bucket.file(destination).delete();
      await assetsService.deleteOne({ _id: new ObjectId(assetId) });
    } catch {}

    return sendResponse({ res, data: { message: "Delete ok" } }, 200);
  }
  public async addAsset(req: Request, res: Response) {
    const { name, description, priority, imgBase64, proyectId } = req.body as addAssetBody;
    const imageBuffer = Buffer.from(imgBase64, "base64");

    const data = {
      name,
      description,
      priority,
      createdAt: new Date(),
      proyectId: new ObjectId(proyectId),
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

  public async updateProyectDetails(req: Request, res: Response) {
    const { id } = req.body as {
      id: string;
      name?: string;
      description?: string;
      priority?: number;
      imgUrl?: string;
    };

    const proyect = await detailsService.findOne({ _id: new ObjectId(id) });
    if (!proyect) return sendResponse({ res }, 505);
    const result = await detailsService.updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    console.log();
    return sendResponse({ res, data: { result } }, 200);
  }
}

export default new ProyectsController();
