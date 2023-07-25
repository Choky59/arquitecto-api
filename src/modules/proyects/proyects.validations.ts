import { body } from "express-validator";
import { createValidation } from "../common/services/validators";
import { ObjectId } from "mongodb";

export default {
  createDetails: () =>
    createValidation([
      body("name")
        .notEmpty()
        .withMessage("username is required")
        .isString()
        .withMessage("username must be a string"),
      body("description")
        .notEmpty()
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string"),
      body("priority")
        .notEmpty()
        .withMessage("priority is required")
        .isNumeric()
        .withMessage("priority must be a number"),
    ]),
  addAsset: () =>
    createValidation([
      body("proyect")
        .notEmpty()
        .withMessage("proyect is required")
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
      body("imgUrl").notEmpty().withMessage("imgUrl must be a file"),
      body("priority")
        .notEmpty()
        .withMessage("priority is required")
        .isNumeric()
        .withMessage("priority must be a number"),
    ]),
};
