import { Router } from 'express';
import authorRoutes from './author.routes';
import bookRoutes from './book.routes';

const router = Router();

// Base routes
router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);

export default router;
