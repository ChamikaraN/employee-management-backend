import { Request, Response, NextFunction } from "express";
import { validationRules } from "../utils/validationRules";

function validateInput(
  req: Request,
  res: Response,
  next: NextFunction
): boolean {
  const errors: { [key: string]: string } = {};

  // for (const [key, value] of Object.entries(req.body)) {
  //   const rule = validationRules[key];

  //   if (rule) {
  //     if (rule.required && !value) {
  //       errors[key] = `${key} is required`;
  //     } else if (value && !rule.pattern.test(value)) {
  //       errors[key] = rule.message;
  //     }
  //   }
  // }

  // return validation errors if any
  if (Object.keys(errors).length > 0) {
    res.status(400).send(errors);
    return false;
  }

  return true;
}

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const isValid = validateInput(req, res, next);
  if (isValid) {
    next();
  }
}
