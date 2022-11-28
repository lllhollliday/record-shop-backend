import { check, validationResult } from "express-validator";

export let usersValidation = [
  check("firstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("minimum character required is 3"),

  check("lastName")
    .trim()
    .isLength({ max: 20 })
    .withMessage("maximum characters allowed are 20"),

  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("please provide us with a valid email"),

  check("password")
    .exists()
    .isLength({ min: 3 })
    .withMessage("password is too short")
    .isLength({ max: 20 })
    .withMessage("password is too long"),

  (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    } else {
      const error = result.errors.reduce((acc, currentItem) => {
        acc[currentItem.params] = currentItem.msg
        return acc
      }, {});
      next({ message:error });
    }
  },
];
