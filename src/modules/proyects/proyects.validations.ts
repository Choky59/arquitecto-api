import { body } from "express-validator";
import { createValidation } from "../common/services/validators";
import { ObjectId } from "mongodb";

export default {
  createDetails: () =>
    createValidation([
      body("name")
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string"),
      body("description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("description must be a string"),
      body("priority")
        .notEmpty()
        .withMessage("priority is required")
        .isNumeric()
        .withMessage("priority must be a number"),
    ]),
  addAsset: () =>
    createValidation([
      body("proyect")
        .custom((id) => {
          try {
            new ObjectId(id);
          } catch (error) {
            return false;
          }
          return true;
        })
        .withMessage("proyect must be a valid id"),
      body("name")
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be a string"),
      body("description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("description must be a string"),
      body("imgBase64")
        .notEmpty()
        .withMessage("imgBase64 is required")
        .isString()
        .withMessage("imgBase64 must be a string"),
      body("priority")
        .notEmpty()
        .withMessage("priority is required")
        .isNumeric()
        .withMessage("priority must be a number"),
    ]),
  deleteDetails: () =>
    createValidation([
      body("proyectId")
        .notEmpty()
        .withMessage("proyectId is required")
        .custom((id) => {
          try {
            new ObjectId(id);
          } catch (error) {
            return false;
          }
          return true;
        })
        .withMessage("proyectId must be a valid id"),
    ]),
  updateDetails: () =>
    createValidation([
      body()
        .notEmpty()
        .custom(async (params) => {
          const validParams = ["id", "name", "description", "priority", "imgUrl"];
          const keys = Object.keys(params);
          for (let i = 0; i < keys.length; i++) {
            if (!validParams.includes(keys[i])) {
              return false;
            }
          }
          return true;
        })
        .withMessage("Not all keys are valid"),
      body("id").notEmpty().withMessage("id is required"),
    ]),
};
