import { Request, Response, NextFunction } from "express";

function validateInput(
  req: Request,
  res: Response,
  next: NextFunction
): boolean {
  const errors: { [key: string]: string } = {};

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
