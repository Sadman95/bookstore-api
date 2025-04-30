import AuthorController from '@/controllers/author.controller';
import { authorValidation } from '@/validators/author.validator';
import { Router } from 'express';

const router = Router();

// Routes
router
  .get('/', AuthorController.getAll)
  .get('/:id', AuthorController.getById)
  .post('/', authorValidation, AuthorController.create)
  .put('/:id', authorValidation, AuthorController.update)
  .delete('/:id', AuthorController.delete);

export default router;
