import { body } from "express-validator";
import { createValidation } from "../common/services/validators";
export default {
  createUser: () =>
    createValidation([
      body("username")
        .notEmpty()
        .withMessage("username is required")
        .isString()
        .withMessage("username must be a string"),
      body("password")
        .notEmpty()
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string"),
    ]),
  createSession: () =>
    createValidation([
      body("username")
        .notEmpty()
        .withMessage("username is required")
        .isString()
        .withMessage("username must be a string"),
      body("password")
        .notEmpty()
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string"),
    ]),
};
