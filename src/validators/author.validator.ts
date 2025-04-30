import { body } from "express-validator";

// Validators
export const authorValidation = [
  body('name').isString().notEmpty().withMessage('Name is required and should be a string'),
  body('birthdate').isISO8601().toDate().withMessage('Birthdate must be a valid date'),
  body('bio').optional().isString(),
];