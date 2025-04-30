import BookController from '@/controllers/book.controller';
import { validateRequest } from '@/middlewares/validateRequest';
import { bookValidation } from '@/validators/book.validator';
import { Router } from 'express';

const router = Router();

// Routes
router
  .get('/', BookController.getAll)
  .get('/:id', BookController.getById)
  .post('/', validateRequest(bookValidation), BookController.create)
  .put('/:id', bookValidation, BookController.update)
  .delete('/:id', BookController.delete);

export default router;
