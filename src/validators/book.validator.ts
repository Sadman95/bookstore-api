import { body } from 'express-validator';


// Validators
export const bookValidation = [
  body('title').isString().notEmpty().withMessage('Title is required and should be a string'),
  body('published_date').isISO8601().toDate().withMessage('Published date must be a valid date'),
  body('description').optional().isString(),
  body('author_id').isInt().withMessage('Author ID must be an integer'),
];